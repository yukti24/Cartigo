import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../window.service';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import * as firebase from 'firebase';
//import 'firebase/compat/auth';
import firebase from 'firebase/app';
import { Response } from 'src/app/_models/response';
import { Router } from '@angular/router';

export class PhoneNumber {
  country: string;
  
  ph:string;
  get e164() {
    const num = this.country + this.ph 
    return `+${num}`
  }
}

@Component({
  selector: 'app-login-sms',
  templateUrl: './login-sms.component.html',
  styleUrls: ['./login-sms.component.scss']
})
export class LoginSmsComponent implements OnInit {
  title = 'angular-phone-verification';
  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  refval:string=''
  isreferal:boolean=false;
  showotp:boolean=false
  routeState: any;
  page : string = ''
  uuid:string=''


  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private win: WindowService,
    private router: Router,
    private alertService: AlertService,

    private accountService: ApiservicesService,
    ) {


      if(localStorage.getItem("uid") !== null)
      {
        this.router.navigate(['/home']);
    
      }
      if (this.router.getCurrentNavigation().extras.state) {
        this.routeState = this.router.getCurrentNavigation().extras.state;
        if (this.routeState) {
         // this.cid = this.routeState.cid;
          this.page = this.routeState.id;
    
        }
      }
    const firebaseConfig = {
      databaseURL: "https://cartigo-332307.firebaseio.com",
      

      apiKey: "AIzaSyCCYBCU_n0BPm-qmFG0yNN6PtlijqfgeJc",
      authDomain: "cartigo-332307.firebaseapp.com",
      projectId: "cartigo-332307",
      storageBucket: "cartigo-332307.appspot.com",
      messagingSenderId: "880628991732",
      appId: "1:880628991732:web:53c97c23b4f14a5ef940a1",
      measurementId: "G-GQZ25D4V7Q"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

   }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }


 


  sendLoginCode() {
   // const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    this.accountService.checkPhoneExist(this.phoneNumber.ph) 
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

         
          
        })

        firebase.auth().signInWithPhoneNumber(num, this.recaptchaVerifier).then(result => {
          this.windowRef.confirmationResult = result;
          this.showotp=true
          console.log(result)
        })
        .catch( error => console.log(error) );
  
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then( result => {
      this.user = result.user;
      this.uuid = localStorage.getItem('devicetoken')

      this.accountService.LoginbyPhone(this.phoneNumber.ph,this.uuid,this.refval) 
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
 

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

}
