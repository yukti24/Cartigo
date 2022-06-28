import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {

  arrOrder:any =[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService
  ) {

    
   }


   getReviews()
  {
    let uid = localStorage.getItem("uid")
    this.accountService.getReviews(uid) 
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

    if(localStorage.getItem("uid") == null)
    {
      this.router.navigate(['/login-phone']);
  
    }

    this.getReviews();

  }

  gotoOrdeerDetsil(id)
  {
    
  }

  deleteWishlist(id)
  {

  }

}
