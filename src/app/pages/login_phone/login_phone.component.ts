import { Component, EventEmitter, NgZone, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/_models/response';
import { AlertService } from 'src/app/_services/alert.service';
import { LoadingController } from '@ionic/angular';

import { User } from 'src/app/_models/user';

import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@angular/cdk/platform';
import firebase from "firebase/app";
import "firebase/auth";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { BehaviorSubject } from 'rxjs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-login_phone',
  templateUrl: './login_phone.component.html',
  styleUrls: ['./login_phone.component.scss']
})
export class Login_phoneComponent implements OnInit {

  form: FormGroup;
  
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  submitted = false;
  
 auth:any;
  
  uuid:string=''

page : string = ''
authStateSubject$ = new BehaviorSubject<firebase.User>(null);
@Output() userSocialLogin = new EventEmitter();

public loading;
isVerifyOtp=false
isreferal=false
otpval :any
otperr=false
otpgen :any
phoneval=''
pherr=false
mobNumberPattern = "/^\d{10}$/";  
phval=false
refval:string=''
  constructor(private formBuilder: FormBuilder,
   
    private router: Router,
    private alertService: AlertService,
    private accountService: ApiservicesService,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
   
  
    public loadingController: LoadingController,) {

      if(localStorage.getItem("uid") !== null)
      {
        this.router.navigate(['/home']);
    
      }
     }

  ngOnInit() {
   


  this.form = this.formBuilder.group({
    phone: ['', [Validators.required]],
    otp: ['', Validators.required]
    
    
});

  }


  get f() { return this.form.controls; }



  onSubmit() {
    this.submitted = true;
    
    if(this.isVerifyOtp==false)
    {
      
      this.phoneval = this.f.phone.value
     // console.log(this.phoneval.toString().length)
      if(this.phoneval.toString().length !==10)
      {
             this.pherr=true;
             return;
      }
      else{
        this.pherr=false;
      }


      this.otpgen = Math.floor(Math.random() * 899999 + 100000);
      console.log(this.otpgen)
      console.log(this.f.phone.value);
      /* this.accountService.sendsms(this.f.email.value,this.otpgen).subscribe(
        data => {
              console.log(data)
        }
      ) */
      this.accountService.checkPhoneExist(this.f.phone.value) 
     .subscribe(
         data => {
             console.log(data)
             let resp = new Response(data)

             if(resp.message=="success")
             {
               this.isreferal = false;
             }
             else{
              this.isreferal = true;
             }
             this.isVerifyOtp = true;
         })
     
      return;
    }
    else{

      console.log(this.otpval);
      if(this.otpval == '')
      {
        console.log(this.otpval);
        this.otperr = true;
        return;
      }
      else
      {
        if(this.otpgen !== this.otpval)
        {
          console.log(this.f.phone.value);
          this.otperr = true;
          return; 
        }
        else{
          this.otperr = false;
       // return;
        }
      }
      //x

    }
    
    // reset alerts on submit
    console.log(this.uuid);

    // stop here if form is invalid
   
   
   // this.loading = true;
    let islogin = false;
    this.alertService.clear();
    this.uuid = localStorage.getItem('devicetoken')
    let userdb = new User();
    userdb.phone = this.f.phone.value;
   
   // userdb.firstname = 'Aniket'
   // userdb.lastname = 'Verma'
   // userdb.phone= '7032909455'
    userdb.uuid = this.uuid;
    //'cwtclKnNRQiMzZmxauq4iF:APA91bHGvWVrrqHBci6Hmyx8utSH4K9fNl0y8zovF2NdZJ6noaHqPcdJV-UCpQK03w2S4D1oTRf9AoC99ZqoRa_ju5kPCzJNsm0zVxYNBR_qpROWms8LzKsvpj7c-rxdlzZTJsn6T7Te';
    //
     this.accountService.LoginbyPhone(this.f.phone.value,this.uuid,this.refval) 
     .subscribe(
         data => {
             console.log(data)
           let resp = new Response(data)

           if(resp.message=="success")
           {

            localStorage.setItem("uid",resp.id);
            localStorage.setItem("referal",resp.referal);
            console.log(resp.message);
    // this.getUserCart();
     if(this.page =='')
     {
       this.router.navigate(['/home']);
       }
       else
       {
         this.router.navigate(['/product-detail']);
       }
           }
      
            else{
              this.alertService.error('Username or password is incorrect');

            }

         },
         error => {
           // this.SpinnerService.hide();
            this.alertService.error('Username or password is incorrect');
            //this.loading = false;
           // this.isErr= true;
         });

         }


}
