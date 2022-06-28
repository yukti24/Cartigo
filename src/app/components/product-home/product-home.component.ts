import { Component, OnInit,ViewChild ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  @Input() isrefresh: boolean=false;

  arrSlider:any=[];
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
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private apiserv: ApiservicesService) {

      this.apiserv.featcategory.subscribe(x=> {
        let url = this.router.url;
        if(url === "/home")
       { 
        this.getTabonedProd(1)
       
       } 
       
         });
       
      
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

  ngOnInit() {
    
  }

  getTabonedProd(i)
  {
   this.apiserv.gettaboneproducts(i).
   subscribe(
     data2 => {

    

      const el: HTMLElement = document.getElementById('divprod');
      el.scrollLeft = 0;
      this.arrSlider = data2;
console.log(this.arrSlider);
     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
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
  this.SpinnerService.show('spinnerhome');
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
          this.SpinnerService.hide('spinnerhome');
       //   this.arrorder = data;
         // this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });
this.getUserCart();
 this.setCartMessage();
//this.cartService.setShowCart(true);
        
      },
      error => {
         this.SpinnerService.hide('spinnerhome');
         //this.alertService.error('Username or password is incorrect');
         //this.loading = false;
        // this.isErr= true;
      });
 
    }
}

}
