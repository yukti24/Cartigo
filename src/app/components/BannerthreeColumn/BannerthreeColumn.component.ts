import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-BannerthreeColumn',
  templateUrl: './BannerthreeColumn.component.html',
  styleUrls: ['./BannerthreeColumn.component.scss']
})
export class BannerthreeColumnComponent implements OnInit {
  arrSlider:any=[];
  image1:string='';
  image2:string='';
  image3:string='';
  @Input() isrefresh: boolean=false;
isData:boolean = false;
  constructor(private apiserv: ApiservicesService,
    private router: Router) { 

    this.apiserv.featcategory.subscribe(x=> {
     
      let url = this.router.url;
      if(url === "/home")
     { 
     this.threeColumnBanners();
     } 
         
     
       });
     
  }


  ngOnInit() {
   // this.threeColumnBanners();
  }



  threeColumnBanners()
  {
    this.apiserv.threeColumnFullWidthBanners().
    subscribe(
      data2 => {

 this.arrSlider = data2;
 this.isData = true
 console.log(this.arrSlider);
 this.image1 = this.arrSlider.banner_1.image.path;
   this.image2 = this.arrSlider.banner_2.image.path;
   this.image3 = this.arrSlider.banner_3.image.path;


        //console.log('Data:', this.countryInfo);
      },
      err =>{
        console.log(err)
        this.isData = false
      } ,
      () => console.log('complete')
    )
  }

}
