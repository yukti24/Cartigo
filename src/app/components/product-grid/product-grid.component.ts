import { Component, OnInit,ViewChild ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
  @Input() isrefresh: boolean=false;

  arrTabs:any=[];
  selectedTab:number = 0;

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


  constructor(private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private apiserv: ApiservicesService) {

      this.apiserv.pageRefresh.subscribe(x=> {
     
        let url = this.router.url;
        if(url === "/home")
       { 
       // this.getproductgridtabs();
       // this.getproductgridproducts(0)
       
       } 
        
           
       
         });
       
      this.getproductgridtabs();
      this.getproductgridproducts(0)
     }


  ngOnInit() {
    
  }

  getproductgridproducts(i)
  {
  this.selectedTab =i;
    this.SpinnerService.show(); 
   this.apiserv.getproductgridproducts(i+1).
   subscribe(
     data2 => {

    
      this.SpinnerService.hide();  
    
this.arrSlider = data2;
console.log(this.arrSlider);
     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
  }



  getproductgridtabs()
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

}
