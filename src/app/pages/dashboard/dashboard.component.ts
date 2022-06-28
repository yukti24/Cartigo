import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/_models/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


   arrOrder:any =[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService
  ) {

    if(localStorage.getItem("uid") == null)
  {
    this.router.navigate(['/login-phone']);

  }

this.getOrders();

   }


    getOrders()
  {
    let uid = localStorage.getItem("uid")
    this.accountService.RecentOrders(uid) 
       .subscribe(
           data => {
               console.log(data)
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);

              this.arrOrder = data;

           },
           error => {
             // this.SpinnerService.hide();
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

}
