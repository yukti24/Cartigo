import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';


@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit {

  arrSlider:any=[];
  slides:any = [];
  arrfeatures:any=[];
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "arrows": true,  
    "infinite": true ,
    "dots":true ,
    "autoplay":true,
    "autoplay_speed": 5000

  };  
   

  constructor(private route: ActivatedRoute,
    private router: Router,private apiserv: ApiservicesService) { 

     // if(localStorage.getItem("uid") == null)
     // {
        //this.router.navigate(['/login']);
    
    //  }

     /*  this.apiserv.pageRefresh.subscribe(data2=> {
        var isdots=false;
        if(data2.dots=="1")
        {
   isdots = true;
        }
        var isarrow=false;
        if(data2.arrows=="1")
        {
         isarrow = true;
        }


        this.arrSlider = data2.slides;


        for (let i = 0; i < this.arrSlider.length; i++) {
         this.slides.push({'image':this.arrSlider[i].file.path})
        // this.slides1.push({'image':this.arrSlider[i].logo.path})
     }

        this.slideConfig = {  
         "slidesToShow": 1,  
         "slidesToScroll": 1, 
         "dots": true,   
         "arrows": isarrow ,  
         "autoplay":true,
         "autoplay_speed": 5000,
         "infinite": false  
       };  
        
    
      });
*/
    } 

  ngOnInit(): void {
this.getSlider();
this.getfeatures();

  }

  

  getSlider() {
    // console.log(navItem.slug);
 
       this.apiserv.getslider().
       subscribe(
         data2 => {
   
       //  console.log(data2);

         var isdots=false;
         if(data2.dots=="1")
         {
    isdots = true;
         }
         var isarrow=false;
         if(data2.arrows=="1")
         {
          isarrow = true;
         }


         this.arrSlider = data2.slides;


         for (let i = 0; i < this.arrSlider.length; i++) {
          this.slides.push({'image':this.arrSlider[i].file.path})
         // this.slides1.push({'image':this.arrSlider[i].logo.path})
      }

         this.slideConfig = {  
          "slidesToShow": 1,  
          "slidesToScroll": 1, 
          "dots": true,   
          "arrows": isarrow ,  
          "autoplay":true,
          "autoplay_speed": 5000,
          "infinite": false  
        };  
         

           //console.log('Data:', this.countryInfo);
         },
         err => console.log(err),
         () => console.log('complete')
       )
   }

   getfeaturedProd()
   {
    this.apiserv.getfeaturedProd().
    subscribe(
      data2 => {



      

        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
   }


   getfeatures()
   {
    this.apiserv.getfeatures().
    subscribe(
      data2 => {


         this.arrfeatures = data2
      console.log(this.arrfeatures)

        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
   }
   
  imgCollection: Array<object> = [
      {
        image: 'https://loremflickr.com/g/600/400/paris',
        thumbImage: 'https://loremflickr.com/g/1200/800/paris',
        alt: 'Image 1',
        title: 'Image 1'
      }, {
        image: 'https://loremflickr.com/600/400/brazil,rio',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 2',
        alt: 'Image 2'
      }, {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 3',
        alt: 'Image 3'
      }, {
        image: 'https://loremflickr.com/600/400/brazil,rio',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 4',
        alt: 'Image 4'
      }, {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://loremflickr.com/1200/800/paris,girl/all',
        title: 'Image 5',
        alt: 'Image 5'
      }, {
        image: 'https://loremflickr.com/600/400/brazil,rio',
        thumbImage: 'https://i.picsum.photos/id/609/400/350.jpg',
        title: 'Image 6',
        alt: 'Image 6'
      }
  ];
  


}
