import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  arrOrder:any =[];

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

this.getOrders();

this.accountService.pageRefresh.subscribe(x=> {
     
  let url = this.router.url;
      
  if(url === "/products"){
   //  this.getOrders();
    }

   });

   }


    getOrders()
  {
    this.SpinnerService.show();
    let uid = localStorage.getItem("uid")
    this.accountService.getOrders(uid) 
       .subscribe(
           data => {
               console.log(data)
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);
           this.SpinnerService.hide();
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

  gotoOrdeerDetsil(id)
  {
    this.router.navigate(['/orderdetail'], { state: {id: id} });

  }

  CancelOrderDetail(id)
  {
    this.SpinnerService.show();
    this.accountService.CancelOrderDetail(id) 
    .subscribe(
        data => {
            console.log(data)
        //  let resp = new Response(data)
        //  console.log(resp.message);
        //  this.router.navigate(['/dashboard']);
        this.SpinnerService.hide();
           this.arrOrder = data;

        },
        error => {
           this.SpinnerService.hide();
           //this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });
   // this.router.navigate(['/orderdetail'], { state: {id: id} });

  }

}
