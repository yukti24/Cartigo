import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-user-coupons',
  templateUrl: './user-coupons.component.html',
  styleUrls: ['./user-coupons.component.scss']
})
export class UserCouponsComponent implements OnInit {

  ccode:string;
  couponamt:string;
  ispercent:string;
  minpurch:string;
  expirydt:string;
   couponcnt:string;
   arrUser:any=[];
   arrCoupon:any=[];
   iscoupons = false;

  constructor(private accountService: ApiservicesService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private router: Router) { 
    if(localStorage.getItem("uid") == null)
    {
      this.router.navigate(['/login-phone']);
  
    }
  }

  ngOnInit() {

    this.getProfile();
   // this.getCoupon();
  }


  
  getProfile()
  {
    this.SpinnerService.show();
    let uid = localStorage.getItem("uid")
    this.accountService.getProfile(uid) 
       .subscribe(
           data => {
               console.log(data)
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);

              this.arrUser = data;
              if(this.arrUser.refcouponcnt>0)
              {
                this.getCoupon();
              }

           },
           error => {
              this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }



  getCoupon()
  {
    let uid = localStorage.getItem("uid")
    this.accountService.getUserCoupon(uid) 
       .subscribe(
           data => {
               console.log(data)
          this.iscoupons=true
              this.arrCoupon = data;
              this.SpinnerService.hide();
           },
           error => {
              this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }


}
