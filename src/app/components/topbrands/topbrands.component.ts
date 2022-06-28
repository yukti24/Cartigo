import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel,NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselConfig,NguCarousel,NguCarouselStore } from '@ngu/carousel';

@Component({
  selector: 'app-topbrands',
  templateUrl: './topbrands.component.html',
  styleUrls: ['./topbrands.component.scss']
})
export class TopbrandsComponent implements OnInit {

  arrSlider:any=[];
  private carouselToken: string;
  @Input() isrefresh: boolean=false;

  slides:any = [];
  slides1:any = [];

  slideConfig = {  
    "slidesToShow": 2,  
    "slidesToScroll": 2,  
    "arrows": true,  
    "infinite": true ,
    "dots":false ,
    "autoplay":false,
    "autoplay_speed": 5000

  };  
   

len=1;
  imgags = [
    'assets/bg.jpg',
    'assets/car.png',
    'assets/canberra.jpg',
    'assets/holi.jpg'
  ];
  public carouselTileItems: Array<any> ;
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  @ViewChild('carousel') carousel: NguCarousel<'carousel'>;

  constructor(private route: ActivatedRoute,config: NgbCarouselConfig,
    private router: Router,private apiserv: ApiservicesService) {

      this.apiserv.pageRefresh.subscribe(x=> {
        let url = this.router.url;
        if(url === "/home")
       {
       // this.getTopBrands()
       } 
         });
       
      
     }

     ngOnInit() {
     // this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
     this.getTopBrands()
      
    }
  
    initDataFn(key: NguCarouselStore) {
      this.carouselToken = key.token;
    }
  
    resetFn() {
      this.carousel.reset(true);
    }
  
    moveToSlide() {
      this.carousel.moveTo( 2, false);
    }
  
   
  getbrand(){
   // alert("kk")
    this.router.navigate(['/brands'])
  }

  getTopBrands()
  {
    this.apiserv.topBrands().
    subscribe(
      data2 => {
 
     
 
     
 this.arrSlider = data2;
 console.log(this.arrSlider);
 
    

 for (let i = 0; i < this.arrSlider.length; i++) {
    this.slides.push({'image':this.arrSlider[i].logo.path})
    this.slides1.push({'image':this.arrSlider[i].logo.path})
}

for (let i = 0; i < this.arrSlider.length; i++) {
 // this.slides.push({'image':this.arrSlider[i].logo.path})
  this.slides1.push({'image':this.arrSlider[i].logo.path})
}
   //this.slides1.concat(this.slides);

  this.len = 4
    console.log(this.slides1);
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

}
