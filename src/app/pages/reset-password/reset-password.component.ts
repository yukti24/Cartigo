import { Component, EventEmitter, NgZone, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/_models/response';
import { AlertService } from 'src/app/_services/alert.service';
import { LoadingController } from '@ionic/angular';

import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  routeState: any;
  submitted = false;
  arrResp:any =[];
  loggedIn: boolean;
userSave = new User()
 auth:any;
  isLoggedin: boolean;  
  uuid:string=''
  arrcart:any=[]
page : string = ''
@Output() userSocialLogin = new EventEmitter();


  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private accountService: ApiservicesService,) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
    
      
      
  });

  }


  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    
    // reset alerts on submit
    console.log(this.uuid);

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("fgfgf");
        return;
    }
    let userdb = new User();
    userdb.email = this.f.email.value.trim();

    this.accountService.ResetPassword(userdb) 
       .subscribe(
           data => {
               console.log(data)
             let resp = new Response(data)
             if(resp.message=="success")
             {
            //  localStorage.setItem("uid",resp.id);
              console.log(resp.message);
              this.alertService.success('Check your email address to reset password');

      // this.getUserCart();
            
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
