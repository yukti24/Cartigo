import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-footer1',
  templateUrl: './footer1.component.html',
  styleUrls: ['./footer1.component.scss']
})
export class Footer1Component implements OnInit {

  isloggedin = false;
  cartno:any =0;
  arrCart:any = [];
   productclass = "";
   whatsappnum:string =''
   whatsapptext:string =''
   iswhatsappload :boolean = false
  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiserv: ApiservicesService,
    private cartService: CartserviceService,
    private accountService: ApiservicesService) {


      this.accountService.userLogin.subscribe(x=> {
         
        let userr = localStorage.getItem("uid");
        // alert(userr);
         if(userr == null)
         {
           this.isloggedin = false;
         }
         else{
           this.isloggedin = true;
         }
       
      // this.type = 'user'

  })


      if(localStorage.getItem("uid") !== null)
{
  this.isloggedin = true;
  //this.getUserCart();
  this.cartno =  localStorage.getItem("cartno")
  }

  let url = this.router.url;
      
  if(url === "/products")
  {
    this.productclass = "active-link"
  }


  this.accountService.userCart.subscribe(x=> {
   // alert("jj")
     console.log(x);
     let arrcart = x;
     //let cart = arrcart.cart
     if(!arrcart.cart)
     {
      localStorage.removeItem('cartid');
      this.cartno = ''
    //  this.isData = false
     }
     else{
     if(arrcart.cart.products.length >0){
       this.cartno =  arrcart.cart.products.length;
     }
     else
     {
       this.cartno = ''
     }
    }
  });




     }

  ngOnInit() {

    this.getWhatsappnum();
  }

//

getUserCart()
{
  this.apiserv.getUserCart().
  subscribe(
    data2 => {
      this.arrCart = data2;
  
    },
    err => console.log(err),
    () => console.log('complete')
  )
}



getWhatsappnum()
{
  this.apiserv.WhatsappNumber().
  subscribe(
    data2 => {
     let arr = data2;
     this.iswhatsappload = true
    this.whatsappnum = arr.whatsapp
    this.whatsapptext = arr.whatsapptext
    },
    err => console.log(err),
    () => console.log('complete')
  )
}

  getTags(slug,name)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
    this.router.onSameUrlNavigation = 'reload';
   this.router.navigate(['/products'], { state: {tag: slug,name:name,type:'tag'} });

  }
//cid: navItem.slug,name:navItem.name,type:'category'

  getTag()
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
    this.router.onSameUrlNavigation = 'reload';
   this.router.navigate(['/products'], { state: {cid: 'hot-deals',name:'Hot Deals',type:'category'} });

  }



  toggleSideCart() {
    // alert("jj");
    this.cartService.setShowCart(true);
   // this.filterService.setShowFilter(true);
   }


}
