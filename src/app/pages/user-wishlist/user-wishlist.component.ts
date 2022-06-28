import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit {

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

    this.getWishlist();

   }


    getWishlist()
  {
    let uid = localStorage.getItem("uid")
    this.accountService.Wishlist(uid) 
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

 
  prodDetail(slug)
  {
    this.router.navigate(['/product-detail'], { state: {slug: slug,type:'product'} });

  }

  deleteWishlist(id)
  {
    this.accountService.remWishlist(id) 
    .subscribe(
        data => {
            console.log(data)
          //  th()is.getWushlistProd(this.arrProd.product.id)
this.getWishlist();
     
        },
        error => {
        
        });

  }
}
