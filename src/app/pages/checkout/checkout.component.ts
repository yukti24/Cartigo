import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Order } from 'src/app/_models/order';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  arrCart:any=[];
  arrorder:any =[];
  arrProd:any=[];
  arrAddress:any=[];
  arrShippMethod=[];
  arrGateway =[];
  promocode:string = '';
  txtordernote = '';
  showBillAddressForm:boolean = false;
  shipdiffAdd :boolean = false;
  ischkTerms = false;
  selbillingaddress=0
  selShippingaddress=0
  shippamt = 0;
  totamt=0;
  order_note=''
  isCouponerr:boolean = false
  arrCouponMsg :any = []
  shippingmethod=''
  chkcod:boolean = false;
  ischkerr:boolean = false;
  constructor(private apiserv: ApiservicesService,
    private router: Router,private SpinnerService: NgxSpinnerService,) {

     // this.apiserv.userCart.subscribe(x=> {
   
       
       // this.getUserCheckout();

        
   
   //  });


}

chkCodOption()
{
   this.chkcod = true;
   this.ischkerr = false;
}

  ngOnInit() {
this.getUserCheckout();
  }
  toggleAddress()
  {
      /*  if(this.showBillAddressForm)
       {
         this.showBillAddressForm = false;
       }
       else{
         this.showBillAddressForm = true;
       } */

       this.router.navigate(['/addresses'], { state: {type:'chkout'} });

  }

  toggleAddressShip()
  {
    this.router.navigate(['/addresses'], { state: {type:'chkout'} });

  }


  toggleShipDiffAddress()
  {
       if(this.shipdiffAdd)
       {
         this.shipdiffAdd = false;
       }
       else{
         this.shipdiffAdd = true;
       }
  }

  chkTerms()
{
  if(this.ischkTerms)
  {
    this.ischkTerms = false
  }
  else{
    this.ischkTerms = true
  }

}

  chkOption(k)
  {
    this.selbillingaddress = k;
    if(!this.shipdiffAdd)
    {
      this.selShippingaddress = k;
    }
   // let qtytxt= (<HTMLInputElement>.value;
   for(let i=0;i<this.arrAddress.length;i++)
   {
    
     console.log((<HTMLInputElement>document.getElementById('chk'+i)).checked);
      if(k != i)
      { console.log(k);
        (<HTMLInputElement>document.getElementById('chk'+i)).checked=false;
      }
   }

  }

  chkShippOption(k)
  {
    this.selShippingaddress = k;
   // let qtytxt= (<HTMLInputElement>.value;
   for(let i=0;i<this.arrAddress.length;i++)
   {
    
     console.log((<HTMLInputElement>document.getElementById('chkshipp'+i)).checked);
      if(k != i)
      { console.log(k);
        (<HTMLInputElement>document.getElementById('chkshipp'+i)).checked=false;
      }
   }

  }


  getUserCheckout()
  {this.SpinnerService.show(); 
    let cartid = localStorage.getItem('cartid')
    this.apiserv.getUserCheckout(cartid).
    subscribe(
      data2 => {
        this.arrCart = data2;
     if(!this.arrCart.cart )
    {
      this.router.navigate(["/cart"]);
    }

        this.SpinnerService.hide(); 
     this.arrAddress = this.arrCart.addresses;
  console.log(data2)
    this.arrGateway = this.arrCart.gateways;
    let amt = this.arrCart.cart.total.amount;
    this.shippamt = parseFloat(this.arrCart.availableShippingMethods.flat_rate.cost.amount);
   

      this.totamt = parseFloat(amt)+ this.shippamt ;

      },
      err => console.log(err),
      () => console.log('complete')
    )
  }



  addCoupon()
  {

    let cartid = localStorage.getItem('cartid')
     console.log(this.promocode);
    this.apiserv.addCoupon(this.promocode,cartid).
    subscribe(
      data2 => {
       
        console.log(this.arrCouponMsg)
        this.arrCouponMsg = data2;
         if(this.arrCouponMsg.message == 'coupon applied')
         {
           this.isCouponerr = false;
          this.getUserCheckout();
         }
         else{
           this.isCouponerr = true;
         }
       




      },
      err => console.log(err),
      () => console.log('complete')
    )
  }


  removeCoupon(promo)
  {
    let cartid = this.arrCart.cart.id;

    this.apiserv.removeCouponReq(promo,cartid).
    subscribe(
      data2 => {
 this.getUserCheckout();
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  checkoutOrder()
  {

    if(!this.chkcod)
    {
this.ischkerr = true;
  return;
    }
    else{
      this.ischkerr = false;
    }
    // this.selb
    let arrbillingAdd  = this.arrAddress[this.selbillingaddress];
    let arrshippAdd  = this.arrAddress[this.selShippingaddress];
    
     let order = new Order;
     order.billing_address_1 = arrbillingAdd.address_1;
     order.billing_address_2 = arrbillingAdd.address_2
     order.billing_address_id = arrbillingAdd.id
     order.billing_city = arrbillingAdd.city
     order.billing_country = arrbillingAdd.country
     order.billing_first_name = arrbillingAdd.first_name
     order.billing_last_name = arrbillingAdd.last_name
     order.billing_phone = arrbillingAdd.phone
     order.billing_state = arrbillingAdd.state
     order.billing_zip = arrbillingAdd.zip

     order.shippingAddressId = arrshippAdd.id
     order.shipping_address_1 = arrshippAdd.address_1
     order.shipping_address_2 = arrshippAdd.address_2
     order.shipping_city = arrshippAdd.city
     order.shipping_country = arrshippAdd.country

     order.shipping_first_name = arrshippAdd.first_name
     order.shipping_last_name = arrshippAdd.last_name
     order.shipping_phone = arrshippAdd.phone
    order.shipping_state = arrshippAdd.state
    order.shipping_zip = arrshippAdd.zip

    order.shipping_cost = this.arrCart.availableShippingMethods.flat_rate.cost.amount;
    order.shipping_method = this.shippingmethod
    order.sub_total = this.arrCart.cart.subtotal
    order.cartid = this.arrCart.cart.id
    order.coupon_id = this.arrCart.cart.promocode;
    order.discount = this.arrCart.cart.discount.amount;
    order.customer_first_name = this.arrCart.user.first_name
    order.customer_last_name = this.arrCart.user.last_name
    order.email = this.arrCart.user.email
    order.phone = this.arrCart.user.phone
    order.order_note = this.txtordernote
    order.payment_method = 'cod'
    order.uid = localStorage.getItem('uid')
  order.total = this.totamt;
    console.log(order)

    this.apiserv.addOrder(order).
    subscribe(
      data => {
 this.getUserCheckout();
 this.arrorder = data;
            this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });



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
this.shippingmethod = label
        this.totamt = parseFloat(amt)+ this.shippamt ;
     return true;
   }
   else{

      if(label == "free_shipping")
      {
        let amt = this.arrCart.cart.total.amount;
        this.shippamt = parseFloat(shipp);
        this.shippingmethod = label

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
