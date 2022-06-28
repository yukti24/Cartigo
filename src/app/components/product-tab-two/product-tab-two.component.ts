import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-tab-two',
  templateUrl: './product-tab-two.component.html',
  styleUrls: ['./product-tab-two.component.scss']
})
export class ProductTabTwoComponent implements OnInit {

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


  constructor(private route: ActivatedRoute,
    private router: Router,private apiserv: ApiservicesService) {

      this.apiserv.pageRefresh.subscribe(x=> {
        let url = this.router.url;
        if(url === "/home")
       {// this.gettabtwoproducts(1)
       
       } 
       
         });
       
      this.gettabtwoproducts(1)
     }


  ngOnInit() {
    
  }

  gettabtwoproducts(i)
  {
   this.apiserv.gettabtwoproducts(i).
   subscribe(
     data2 => {

    

    
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
}
