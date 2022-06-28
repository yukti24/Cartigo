import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  arrOrder:any =[];
orderid:string='';
routeState: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService,
    private SpinnerService: NgxSpinnerService
  ) {
    

    if(localStorage.getItem("uid") == null)
    {
      this.router.navigate(['/login-phone']);
  
    }

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.orderid = this.routeState.id;
       // this.name = this.routeState.name;
        //this.data.site = this.routeState.site ? this.routeState.site : '';
        //  console.log(this.cid);
        this.getOrderDetail(this.orderid);
       // this.getLatestProducts();
      }
    }





   }


   getOrderDetail(id)
  {
    this.SpinnerService.show(); 
    this.accountService.getOrderDetail(id) 
       .subscribe(
           data => {
            this.SpinnerService.hide();
               console.log(data)
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);

              this.arrOrder = data;

           },
           error => {
              this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }


  ngOnInit() {
  }

}
