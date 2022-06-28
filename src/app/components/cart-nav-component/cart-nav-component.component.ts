import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-cart-nav-component',
  templateUrl: './cart-nav-component.component.html',
  styleUrls: ['./cart-nav-component.component.scss']
})
export class CartNavComponentComponent implements OnInit {

  arrSlider:any=[];
  arrProd:any=[];
  isData:boolean = false;
  constructor(private apiserv: ApiservicesService) {



  this.apiserv.userCart.subscribe(x=> {
   
     this.arrSlider = x;
     if(!this.arrSlider.cart)
     {
      localStorage.removeItem('cartid');
      this.isData = false
     }
     else{
      if(this.arrSlider.cart.products.length >0){

      this.isData = true
   
      this.arrProd = this.arrSlider.cart.products;
      console.log("carttt");
      console.log(this.arrProd)
      localStorage.setItem('cartid',this.arrSlider.cart.id)

     }
     else{
      localStorage.removeItem('cartid');
      this.isData = false
     } 
    }

     

  });
   }

  ngOnInit() {



    if(localStorage.getItem("uid") !== null)
    {
    this.getUserCart();
    }
  }



  getUserCart()
  {
    this.apiserv.getUserCart().
    subscribe(
      data2 => {
        this.arrSlider = data2;
    
    if(this.arrSlider.cart.products.length >0){
      console.log("abc")
      console.log( this.arrSlider )
      this.isData = true
 
      this.arrProd = this.arrSlider.cart.products;
    console.log("carttt");
    console.log(this.arrProd)
      localStorage.setItem('cartid',this.arrSlider.cart.id)

     }
     else{
      localStorage.removeItem('cartid');
      this.isData = false
     }




      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  removeItem(cartprodid)
  {
    let cartid = this.arrSlider.cart.id;

    this.apiserv.removeCartItem(cartid,cartprodid).
    subscribe(
      data2 => {
 this.getUserCart();
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

}
