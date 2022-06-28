import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  


@Component({
  selector: 'app-vertical-product',
  templateUrl: './vertical-product.component.html',
  styleUrls: ['./vertical-product.component.scss']
})
export class VerticalProductComponent implements OnInit {

  arrSlider:any=[];
  arrSlider1:any=[];
  arrSlider2:any=[];

  arrData:any=[];
  arrData1:any=[];
  arrData2:any=[];


  arrCat:any=[];
  arrCat1:any=[];
  arrCat2:any=[];

  image1:string='';
  image2:string='';
  image3:string='';
  tot:any=0
  tot1:any=0
  tot2:any=0
  curr:any=0;
  curr1 :any=0;
  curr2:any=0

  offset1:any=0
  offset2:any=0
  offset3:any=0

  isAddtocart:boolean=false

  constructor(private apiserv: ApiservicesService,  private SpinnerService: NgxSpinnerService, private router: Router) {
    
    this.apiserv.pageRefresh.subscribe(x=> {
      let url = this.router.url;
        if(url === "/home")
       {
      
        
       } 
     
       });
     
  }

  ngOnInit() {
    this.flashSaleAndVerticalProducts();
    this.getFeatureProducts1();
    this.getFeatureProducts2();
    this.getFeatureProducts3();
  }


  prodDetail(slug,name)
  {
    this.router.navigate(['/product-detail'], { state: {slug: slug,name:name} });

  }



  getFeatureProducts1()
  {
    this.SpinnerService.show("spinner1"); 
    this.apiserv.getFeatureProducts("1",this.offset1).
    subscribe(
      data2 => {

 this.SpinnerService.hide("spinner1");
  let arr :any =[];
   arr = data2;
   this.arrSlider = arr.product;
 
   this.tot = Math.floor(arr.count/5)
    this.arrCat = arr.category;
       // this.arrSlider = this.arrData.slice(0,5);
       
     //   console.log(this.arrData.length);
     //   console.log(this.tot);
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }



  getFeatureProducts2()
  {
    this.SpinnerService.show("spinner2"); 
    this.apiserv.getFeatureProducts("2",this.offset2).
    subscribe(
      data2 => {

        this.SpinnerService.hide("spinner2"); 
  let arr :any =[];
  arr = data2;
  this.arrSlider1 = arr.product;
  this.arrCat1 = arr.category;
  this.tot1 = Math.floor(arr.count/5)

      },
      err => console.log(err),
      () => console.log('complete')
    )
  }




  getFeatureProducts3()
  {  this.SpinnerService.show("spinner3"); 
    this.apiserv.getFeatureProducts("3",this.offset3).
    subscribe(
      data2 => {
        this.SpinnerService.hide("spinner3"); 
       
  let arr :any =[];
  arr = data2;
  this.arrSlider2 = arr.product;
  this.arrCat2 = arr.category;
  this.tot2 = Math.floor(arr.count/5)
  console.log("total cnt");
      console.log(this.tot2)
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }




  flashSaleAndVerticalProducts()
  {
    this.apiserv.flashSaleAndVerticalProducts().
    subscribe(
      data2 => {

 
 console.log(this.arrSlider);
 this.image1 = data2.vertical_products_1_title;
   this.image2 = data2.vertical_products_2_title;
   this.image3 = data2.vertical_products_3_title;
  

        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }


  viewAllCategory1()
  {

      let slug= this.arrCat.slug;
      let name = this.arrCat.name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }


  viewAllCategory2()
  {

      let slug= this.arrCat1.slug;
      let name = this.arrCat1.name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }


  viewAllCategory3()
  {

      let slug= this.arrCat2.slug;
      let name = this.arrCat2.name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }

btnNext()
{
  if(this.curr <= this.tot)
  { 
this.curr = this.curr+1;
  
console.log(this.curr);
this.offset1 = this.curr*5;
  }
if(this.curr == this.tot)
{
  /*  var mod = this.arrData.length % 5;
   if(mod == 0)
   {
    this.arrSlider = this.arrData.slice(this.curr*5,this.curr*5+5);

   }
   else{
    this.arrSlider = this.arrData.slice(this.curr*5,this.curr*5+mod);

   } */
   this.getFeatureProducts1();

}
if(this.curr < this.tot)
{

 // this.arrSlider = this.arrData.slice(this.curr*5,this.curr*5+5);
this.getFeatureProducts1();
}
if(this.curr > this.tot)
{
  console.log(this.arrSlider );
 // this.arrSlider = this.arrData.slice(this.curr*5,this.curr*5+5);

}

}

btnNext1()
{
  if(this.curr1 <= this.tot1)
  {
  this.curr1 = this.curr1+1;
  this.offset2 = this.curr1*5;
  }

  if(this.curr1 == this.tot1)
  {
     var mod = this.arrData1.length % 5;
     if(mod == 0)
     {
    //  this.arrSlider1 = this.arrData1.slice(this.curr1*5,this.curr1*5+5);
  
     }
     else{
     // this.arrSlider1 = this.arrData1.slice(this.curr1*5,this.curr1*5+mod);
  
     }

     this.getFeatureProducts2();
  }
  if(this.curr1 < this.tot1)
  {
   // this.arrSlider1 = this.arrData1.slice(this.curr1*5,this.curr1*5+5);
   this.getFeatureProducts2();
  }
  if(this.curr1 < this.tot1)
  {
   // this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+5);
   //this.getFeatureProducts3();
  }
}
btnNext2()
{
  if(this.curr2 < this.tot2)
  {
  this.curr2 = this.curr2+1;
  
  this.offset3 = this.curr2*5;

  
  }
  if(this.curr2 == this.tot2)
  {
     var mod = this.arrData2.length % 5;
     if(mod == 0)
     {
     // this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+5);
  
     }
     else{
     // this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+mod);
  
     }

     this.getFeatureProducts3();
  }
  if(this.curr2 < this.tot2)
  {
   // this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+5);
   this.getFeatureProducts3();
  }
  if(this.curr2 > this.tot2)
  {
   // this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+5);
  
  }
}


btnPrev()
{
  if(this.curr !== 0)
  {
    this.curr = this.curr-1;
    this.offset1 = this.curr*5;
    this.getFeatureProducts1();

    console.log(this.curr);
    console.log(this.arrData.length);
  //  this.arrSlider = this.arrData.slice(this.curr*5,this.curr*5+5);
    console.log(this.arrSlider );
  }
  

}

btnPrev1()
{
  if(this.curr1 !== 0)
  {
    this.curr1 = this.curr1-1;
    console.log(this.curr1);
    this.offset2 = this.curr1*5;
    this.getFeatureProducts2();

   // this.arrSlider1 = this.arrData1.slice(this.curr1*5,this.curr1*5+5);
    console.log(this.arrSlider1 );

  }

}
btnPrev2()
{
  if(this.curr2 !== 0)
  {
this.curr2 = this.curr2-1;
this.offset3 = this.curr2*5;
this.getFeatureProducts3();

//this.arrSlider2 = this.arrData2.slice(this.curr2*5,this.curr2*5+5);
console.log(this.arrSlider2 );
  }
}




getUserCart()
{
  this.apiserv.getUserCart().
  subscribe(
    data2 => {
    //  this.arrCart = data2;
  
    },
    err => console.log(err),
    () => console.log('complete')
  )
}

setCartMessage() {
   
  // Remove the first time from the array
 
  this.isAddtocart =true
  // Wait for the given amount of time
  setTimeout(() => {
    this.isAddtocart =false
      // Call the setDelay function again with the remaining times
     // setDelay(times);
  }, 3000);

}

addToCart(item)
{
this.SpinnerService.show('spinner3');
if(localStorage.getItem("uid") == null)
{
 
  this.router.navigate(['/login-phone'], { state: {id: 'cart'} });

}

//return false;
let optid = "0"
let price = 0;// parseFloat(this.prodSavePrice);
let cartid = localStorage.getItem('cartid')
if(cartid == 'undefined' || cartid == null)
{
  cartid = ''
}
   console.log(cartid);


if(item.options_count>0)
{
 this.prodDetail(item.slug,item.name);
}
else{

 price =  item.selling_price.inCurrentCurrency.amount;

this.apiserv.addtoCart('0','0',item.id,1,price,'0','',cartid) 
.subscribe(
    data => {
        console.log(data)
        this.SpinnerService.hide('spinner3');
     //   this.arrorder = data;
       // this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });
this.getUserCart();
this.setCartMessage()
//this.cartService.setShowCart(true);
      
    },
    error => {
       this.SpinnerService.hide('spinner3');
       //this.alertService.error('Username or password is incorrect');
       //this.loading = false;
      // this.isErr= true;
    });

  }
}




}
