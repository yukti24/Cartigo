import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  arrCart:any=[];
  arrProd:any=[];
  promocode:string = ''
  shippamt = 0;
  totamt=0;
  arrMsg :any = [];
  iserr:boolean = false;
  isDataloaded=false;
  isDatafound=true;
  arrShippMethod=[];
  isDelcart:boolean=false
  constructor(private apiserv: ApiservicesService, private SpinnerService: NgxSpinnerService,) {

   
    this.apiserv.userCart.subscribe(x=> {
   
      this.arrCart = x;
      if(!this.arrCart.cart)
      {
       localStorage.removeItem('cartid');
       this.isDataloaded = false
      }
      else{
       if(this.arrCart.cart.products.length >0){
 
       this.isDataloaded = true
    
       this.arrProd = this.arrCart.cart.products;
       
 
      }
      else{
       localStorage.removeItem('cartid');
       this.isDataloaded = false
      } 
     }
 
      
 
   });
//this.getUserCart();

  }

  ngOnInit() {
    if(localStorage.getItem("uid") !== null)
    {
      this.SpinnerService.show(); 
    this.getUserCart();
    }
  }


  indexTracker(index: number, value: any) {
    return index;
  }

  qtyUp(i,cartprodid)
  {
    //this.currQty = this.currQty +1;
     //document.getElementById('txt'+i).va
    let qtytxt= (<HTMLInputElement>document.getElementById('txt'+i)).value;
    
    let totqty  = parseInt(qtytxt)  +1;

    (<HTMLInputElement>document.getElementById('txt'+i)).value = totqty.toString();

     
    this.UpdateUserCart(cartprodid,totqty)
  }

  qtyDown(i,cartprodid)
  {

    let qtytxt1= (<HTMLInputElement>document.getElementById('txt'+i)).value;
    let qtytxt = parseInt(qtytxt1);


   if( qtytxt  > 1)
  {
    qtytxt= qtytxt - 1;
    (<HTMLInputElement>document.getElementById('txt'+i)).value = qtytxt.toString();
    this.UpdateUserCart(cartprodid,qtytxt);
  }

  }



  UpdateUserCart(cartprodid,qty)
  {

    let cartid = this.arrCart.cart.id;

    this.apiserv.UpdateUserCart(qty,cartid,cartprodid).
    subscribe(
      data2 => {
        this.SpinnerService.show(); 
        this.getUserCart();




      },
      err => console.log(err),
      () => console.log('complete')
    )
  }



  addCoupon()
  {

    let cartid = this.arrCart.cart.id;
     console.log(this.promocode);
     let strFirst4 = this.promocode.substring(0,4);
   
     if(strFirst4=='REF$')
     {
      this.apiserv.addRefCoupon(this.promocode,cartid).
      subscribe(
        data2 => {
         
  
         console.log(this.arrMsg)
      this.arrMsg = data2;
       if(this.arrMsg.message == 'coupon applied')
       {
         this.iserr = false;
         this.SpinnerService.show(); 
        this.getUserCart();
       }
       else{
         this.iserr = true;
       }
  
          
  
  
  
  
        },
        err => console.log(err),
        () => console.log('complete')
      )
     }
else{
  this.apiserv.addCoupon(this.promocode,cartid).
  subscribe(
    data2 => {
     

     console.log(this.arrMsg)
  this.arrMsg = data2;
   if(this.arrMsg.message == 'coupon applied')
   {
     this.iserr = false;
     this.SpinnerService.show(); 
    this.getUserCart();
   }
   else{
     this.iserr = true;
   }

      




    },
    err => console.log(err),
    () => console.log('complete')
  )
}
    
  }

  getUserCart()
  { 
    this.apiserv.getUserCart().
    subscribe(
      data2 => {
        this.SpinnerService.hide(); 
        this.arrCart = data2;
        this.isDataloaded= true;
      if(this.arrCart.cart){

      
    if(this.arrCart.cart.products.length >0){

      this.isDatafound=true;
     
      console.log("this.arrCart.cart.id")
      this.arrProd = this.arrCart.cart.products;
       console.log(this.arrProd)
       localStorage.setItem('cartid',this.arrCart.cart.id)
       localStorage.setItem('cartno',this.arrCart.cart.products.length)

      let amt = this.arrCart.cart.total.amount;
      this.shippamt = parseFloat(this.arrCart.availableShippingMethods.flat_rate.cost.amount);

        this.totamt = parseFloat(amt)+ this.shippamt ;

     }
     else{
      this.isDatafound=true;
      localStorage.removeItem('cartid');
      localStorage.setItem('cartno','')
     }
    }
    else{
      localStorage.removeItem('cartid');
      localStorage.setItem('cartno','')
      this.isDatafound=false;
      this.isDataloaded= false;
     }




      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  removeItem(cartprodid)
  {
    let cartid = this.arrCart.cart.id;
    this.SpinnerService.show(); 
    this.apiserv.removeCartItem(cartid,cartprodid).
    subscribe(
      data2 => {
        this.setCartMessage();
 this.getUserCart();
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }


  setCartMessage() {
   
    // Remove the first time from the array
   
    this.isDelcart =true
    // Wait for the given amount of time
    setTimeout(() => {
      this.isDelcart =false
        // Call the setDelay function again with the remaining times
       // setDelay(times);
    }, 3000);
 
}


  removeCoupon(promo)
  {
    let cartid = this.arrCart.cart.id;

    this.apiserv.removeCouponReq(promo,cartid).
    subscribe(
      data2 => {
        this.SpinnerService.show(); 
 this.getUserCart();
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }




  getShippingSel(label,shipp){

    this.arrShippMethod = Object.values(this.arrCart.availableShippingMethods)
    console.log(this.arrShippMethod.length)
   if(this.arrShippMethod.length==1)
   {
    console.log('trbue')
    let amt = this.arrCart.cart.total.amount;
      this.shippamt = parseFloat(shipp);

        this.totamt = parseFloat(amt)+ this.shippamt ;
     return true;
   }
   else{

      if(label == "free_shipping")
      {
        let amt = this.arrCart.cart.total.amount;
        this.shippamt = parseFloat(shipp);
  
          this.totamt = parseFloat(amt)+ this.shippamt ;
        return true;
      }
      else{
        console.log('fa')
        return false;
      }


   }
  
      
}



}
