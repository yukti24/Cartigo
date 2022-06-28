import { Component, OnInit,ViewChild ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
  @Input() isrefresh: boolean=false;

  arrTabs:any=[];
  selectedTab:number = 0;
arrCat:any=[];
  arrSlider:any=[];
  arrSlider1:any=[];
  arrSlider2:any=[];
  arrSlider3:any=[];

  noimage="../../../assets/no-image.png"

  slideConfig1 = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "arrows": true,  
    "infinite": true ,
    "dots":true ,
   

  };  
   
  slides = [
    {'image': 'https://cartigo.in/storage/media/RDm3M3WfG3HyDs2ihbYspYxJiuHzoAOj8bOI1Ron.png'}, 
    {'image': 'https://cartigo.in/storage/media/RDm3M3WfG3HyDs2ihbYspYxJiuHzoAOj8bOI1Ron.png'},
    {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, 
    {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, 
    {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}
  ];
  isAddtocart:boolean=false


  constructor(private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private apiserv: ApiservicesService) {

      this.apiserv.pageRefresh.subscribe(x=> {
     
        let url = this.router.url;
        if(url === "/home")
       { 
        
       } 
        
           
       
         });
       
     
    //  this.getproductgridproducts(0);
    //  this.getproductgridtabs();
     }

     


  ngOnInit() {
    this.getproductgridtabs();
        this.getproductgridtabsname();
        this.getproductgridproducts(0)
        this.getproductgridproducts(1)
        this.getproductgridproducts(2)
        this.getproductgridproducts(3)
       
  }

  getproductgridproducts(i)
  {
  this.selectedTab =i;
    this.SpinnerService.show(); 
   this.apiserv.getproductgridproducts(i+1).
   subscribe(
     data2 => {

    
      this.SpinnerService.hide();  
  if(i==0)  
this.arrSlider = data2;

if(i==1)  
this.arrSlider1 = data2;

if(i==2)  
this.arrSlider2 = data2;

if(i==3)  
this.arrSlider3 = data2;

     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
  }



  getproductgridtabs()
  {
   this.apiserv.getproductgridCategory().
   subscribe(
     data2 => {

    

    
this.arrCat = data2;
     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
  }



  getproductgridtabsname()
  {
   this.apiserv.getproductgrid().
   subscribe(
     data2 => {

    

    
this.arrTabs = data2;
console.log(this.arrTabs);
     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
  }



  viewAllCategory1()
  {

      let slug= this.arrCat[0].slug;
      let name = this.arrCat[0].name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }



  viewAllCategory2()
  {

      let slug= this.arrCat[1].slug;
      let name = this.arrCat[1].name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }



  viewAllCategory3()
  {

      let slug= this.arrCat[2].slug;
      let name = this.arrCat[2].name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }



  viewAllCategory4()
  {

      let slug= this.arrCat[3].slug;
      let name = this.arrCat[3].name;
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }

  navigateToSlide(item) {
    this.ngCarousel.select(item);
    console.log(item)
  }

  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }

  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }

  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }

  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }

  prodDetail(slug,name)
  {
    this.router.navigate(['/product-detail'], { state: {slug: slug,name:name} });

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

addToCart(item)
{
  this.SpinnerService.show('spinnerRow');
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
          this.SpinnerService.hide('spinnerRow');
       //   this.arrorder = data;
       this.setCartMessage();
         // this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });
this.getUserCart();
 
//this.cartService.setShowCart(true);
        
      },
      error => {
         this.SpinnerService.hide('spinnerRow');
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
