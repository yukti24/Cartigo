import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AlertService } from 'src/app/_services/alert.service';
import { first } from 'rxjs/operators';
import { Response } from 'src/app/_models/response';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  isErr:boolean = false;
  errormsg:string;
  isSuccess: boolean = false;
  succmsg :string ="";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  iserrcnf:boolean = false;;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService,
    private SpinnerService: NgxSpinnerService,
    private alertService: AlertService


  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z. ]*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z. ]*$')]],
      phone: ['', [Validators.required,  Validators.pattern('[0-9 ]{10}')]],
      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      repassword: ['', Validators.required],
      chkPolicy: [false, Validators.requiredTrue],
    
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      console.log(this.f.password.value);
      console.log(this.f.password.value);

      // reset alerts on submit
      this.alertService.clear();
  if(this.f.repassword.value !== this.f.password.value )
       {
        // alert("kk");
         this.iserrcnf = true;
         return ;
       }
      // stop here if form is invalid
      
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.Register(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                 let resp = new Response(data);
            
             if(resp.message == "user exists")
             {
               //  alert("Email already exist");
               this.isErr = true;
               this.isSuccess = false;
              // this.errormsg = "Email already exist"
               this.alertService.error('Email already exist', { keepAfterRouteChange: true });
              
             }
             else{
             // alert("Registration successful");
             this.isSuccess = true;
             this.isErr = false;
           //  this.succmsg = "Registration Successful. An email with temporary password will be sent to you for verification"
              this.alertService.success('Registration Successful. ', { keepAfterRouteChange: true });
             
             
        
             this.router.navigate(['/login-phone'], { relativeTo: this.route });

             }
                 // 
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
