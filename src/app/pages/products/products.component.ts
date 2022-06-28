import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { FilterService } from 'src/app/services/filter.service';
import {PageEvent} from '@angular/material/paginator'
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";  
import { Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pageEvent: PageEvent;
  numbers:Array<any> = [];
  currQty:number=1;

  cid:string='';
  routeState: any;
  arrProd:any = [] ;
   arrLatestProd:any=[];
  gridvw: string="btn btn-grid-view active";
  listvw:string="btn btn-list-view";
  gridvwact: string="";
  listvwact: string="";
  isListvw: boolean= false;
name:string='';
selectedOption:string="latest";
selectedPerpage ="30"
selectedPage:number= 1
arrData:any=[];

lowval:string='0'

highval:string='3050'

isAddtocart:boolean=false;

 brand:string=''
 type:string=''
 tag:string =''
 query='';
  isDataloaded:boolean=false;

  title = 'example';
  targetElement: Element;

  constructor(private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
     private toastCtrl: ToastController,
    private router: Router,private apiserv: ApiservicesService
      , private filterser : FilterService) { 

       /*  if(localStorage.getItem("uid") == null)
        {
          this.router.navigate(['/login']);
      
        } */

      if (this.router.getCurrentNavigation().extras.state) {
        this.routeState = this.router.getCurrentNavigation().extras.state;
        if (this.routeState) {
         // this.cid = this.routeState.cid;
          this.name = this.routeState.name;

          this.type = this.routeState.type;
          if(this.type == 'category')
         {
          this.cid = this.routeState.cid;
          this.name = this.routeState.name;

         }
         if(this.type == 'tag')
         {
          this.tag = this.routeState.tag;
          this.name = this.routeState.name;

         }
         if(this.type == 'brand')
         {
          this.brand = this.routeState.brand;
          
         }
         if(this.type == 'shop')
         {
          this.brand = '';
          this.cid = ''
          this.tag ='';
          this.name = 'Shop'
          
         }
         if(this.type == 'query')
         {
          this.query = this.routeState.query;
          this.cid = ''
          this.tag ='';
          this.name = ''
          localStorage.setItem("prodquery",this.routeState.query)
         }
          
           localStorage.setItem("prodname",this.name)
           localStorage.setItem("prodtype",this.type)
           localStorage.setItem("prodcid",this.cid)
           localStorage.setItem("prodbrand",this.brand)
           localStorage.setItem("prodtag",this.tag)


          this.getProducts(this.cid);
          this.getLatestProducts();
        }
        else{
      
         // this.router.navigate(['users/user-course']);
        }
      } else{
      
          this.cid = localStorage.getItem("prodcid")
          this.type = localStorage.getItem("prodtype")
          this.name = localStorage.getItem("prodname")

         
          this.tag = localStorage.getItem("prodtag")
          if(this.type == 'category')
          {
           this.cid = localStorage.getItem("prodcid")
           this.name = localStorage.getItem("prodname")
 
          }
          if(this.type == 'tag')
          {
         ///  this.tag = this.routeState.tag;
          // this.name = this.routeState.name;
 
          }
          if(this.type == 'brand')
          {
            localStorage.getItem("prodbrand")
           
          }
          if(this.type == 'shop')
          {
           this.brand = '';
           this.cid = ''
           this.tag ='';
           this.name = 'Shop'
           
          }
          if(this.type == 'query')
          {
           this.query = localStorage.getItem("prodquery")
           this.cid = ''
           this.tag ='';
           this.name = ''


           
          }
           
           
 
           this.getProducts(this.cid);
           this.getLatestProducts();




       // this.router.navigate(['users/user-course']);
      }

      this.apiserv.pageRefresh.subscribe(x=> {
        let url = this.router.url;
      
        if(url === "/products"){
          this.getProducts(this.cid);
          this.getLatestProducts();
        }
        
     
         });

      this.filterser.highvaluechange.subscribe(x=> {
         
        
       console.log(x);
       this.highval = x;
       this.getProducts(this.cid)
      // this.type = 'user'

  })



  this.filterser.lowvaluechange.subscribe(x=> {
         
    this.lowval = x;

    this.getProducts(this.cid)
   // this.type = 'user'

})



this.filterser.brandvaluechange.subscribe(x=> {
         
  this.brand = x

  this.getProducts(this.cid)
 // this.type = 'user'

})

    }


     
    toggleSideF() {
      // alert("jj");
      console.log('hhh')
       this.filterser.setShowFilter(true);
     }
   


    gridFn()
    {
      this.isListvw = false;
      this.gridvw = "btn btn-grid-view active";
      this.listvw ="btn btn-list-view"
    }

    listFn()
    {
      this.isListvw = true;
      this.gridvw = "btn btn-grid-view ";
      this.listvw ="btn btn-list-view active"
    }


  prodDetail(slug)
  {
    this.router.navigate(['/product-detail'], { state: {slug: slug,type:'product'} });

  }



//https://cartigo.in/products?query=&brand=&category=staples&tag=&fromPrice=0&toPrice=5153&sort=relevance&perPage=30&page=1
  
  
getSortData(option) {
  // console.log(navItem.slug);
this.selectedOption = option;
this.SpinnerService.show();
this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
subscribe(
       data2 => {
        this.SpinnerService.hide();

        this.arrData = data2.products;
       this.arrProd = data2.products.data;
         //console.log('Data:', this.countryInfo);
       },
       err => console.log(err),
       () => console.log('complete')
     )
 }
 scrollToTop(el) {
   //console.log(el)
  el.scrollTop = 0;    
}


scrollToElement(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}
getNextPageData(el)
{
  this.SpinnerService.show();

  this.selectedPage = this.selectedPage +1;
    this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
    subscribe(
       data2 => {
        this.SpinnerService.hide();

        this.arrData = data2.products;
       this.arrProd = data2.products.data;
       this.scrollToElement(el);
         //console.log('Data:', this.countryInfo);
       },
       err => console.log(err),
       () => console.log('complete')
     )
}


 getPrevPageData(el)
 {
  if(this.selectedPage > 1)
  {
    this.SpinnerService.show();

    this.selectedPage = this.selectedPage -1;
    this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
    subscribe(
       data2 => {
        this.SpinnerService.hide();

        this.arrData = data2.products;
       this.arrProd = data2.products.data;
       this.scrollToElement(el);
         //console.log('Data:', this.countryInfo);#container
       },
       err => console.log(err),
       () => console.log('complete')
     )
  }


 }



getperpageData(perpage) {
  console.log(perpage)
  // console.log(navItem.slug);
this.selectedPerpage= perpage
this.SpinnerService.show();

this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
subscribe(
       data2 => {

        this.SpinnerService.hide();

 
        this.arrData = data2.products;
       this.arrProd = data2.products.data;
         //console.log('Data:', this.countryInfo);
       },
       err => console.log(err),
       () => console.log('complete')
     )
 }


getPageData(page,el) {
  // console.log(navItem.slug);
this.selectedPage = page;
this.SpinnerService.show();

this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
subscribe(
       data2 => {
        this.SpinnerService.hide();

        this.arrData = data2.products;
       this.arrProd = data2.products.data;
       this.scrollToElement(el);
         //console.log('Data:', this.countryInfo);
       },
       err => console.log(err),
       () => console.log('complete')
     )
 }

 onTableDataChange(event,el){
  this.selectedPage = event;
  this.getPaginateData(el);
}  

  getPaginateData(el)
  {
 // console.log(navItem.slug);
 this.SpinnerService.show();

   this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
subscribe(
       data2 => {
        this.SpinnerService.hide();

        this.arrData = data2.products;
       this.arrProd = data2.products.data;
       this.scrollToElement(el);
         //console.log('Data:', this.countryInfo);
       },
       err => console.log(err),
       () => console.log('complete')
     )
 

  }




  async showToast() {
    console.log("ok clicked");
    await this.toastCtrl.create({
      message: "Hey! it's a toast",
      duration: 2000,
      position: 'middle',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log("ok clicked");
        }
      }]
    }).then(res => res.present());
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

     getProducts(slug) {
     // console.log(navItem.slug);
     this.SpinnerService.show(); 
        this.apiserv.getCategory(this.query,this.brand,this.cid,this.tag,this.lowval,this.highval,this.selectedOption,this.selectedPerpage,this.selectedPage).
        subscribe(
          data2 => {
            this.SpinnerService.hide(); 
        this.arrData = data2.products;
          this.arrProd = data2.products.data;
          console.log(this.arrProd.length);
          if(this.arrProd.length > 0)
          {
            this.isDataloaded = true;
          }
          else{
            this.isDataloaded = false;
          }
          let num = parseInt(this.arrData.last_page)
          if(num < 6)
          this.numbers = Array.from({length:num},(v,k)=>k+1);
          else
          this.numbers = Array.from({length:6},(v,k)=>k+1);

          console.log(this.numbers);
            //console.log('Data:', this.countryInfo);
          },
          err => {console.log(err)
          this.isDataloaded = false;
          },
          () => console.log('complete')
        )
    }

    getLatestProducts() {
      // console.log(navItem.slug);
   
         this.apiserv.latestProducts().
         subscribe(
           data2 => {
     
        
           this.arrLatestProd = data2;
             //console.log('Data:', this.countryInfo);
           },
           err => console.log(err),
           () => console.log('complete')
         )
     }

  

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  ngOnInit() {

    this.targetElement = document.querySelector('html');
  }

  myRefreshEvent(event: Subject<any>, message: string) {
   
   this.getProducts(this.cid);
    setTimeout(() => {
       // alert(message);
        event.next();
    }, 3000);
}



addToCart1(item)
{

console.log(item);
}

addToCart(item)
{
  this.SpinnerService.show();
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
   this.prodDetail(item.slug);
}
else{

   price =  item.selling_price.inCurrentCurrency.amount;

  this.apiserv.addtoCart('0','0',item.id,1,price,'0','',cartid) 
  .subscribe(
      data => {
          console.log(data)
          this.SpinnerService.hide();
          this.setCartMessage()
       //   this.arrorder = data;
         // this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });
this.getUserCart();
 
//this.cartService.setShowCart(true);
        
      },
      error => {
         this.SpinnerService.hide();
         //this.alertService.error('Username or password is incorrect');
         //this.loading = false;
        // this.isErr= true;
      });
 
    }
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

}
