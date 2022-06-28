import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-BannertwoColumn',
  templateUrl: './BannertwoColumn.component.html',
  styleUrls: ['./BannertwoColumn.component.scss']
})
export class BannertwoColumnComponent implements OnInit {

  arrSlider:any=[];
  image1:string='';
  image2:string='';
  image3:string='';
  @Input() isrefresh: boolean=false;
isdata :boolean = false;
  constructor(private apiserv: ApiservicesService,
    private router: Router) {

    this.apiserv.pageRefresh.subscribe(x=> {
     
      let url = this.router.url;
      if(url === "/home")
     { 
     // this.twoColumnBanners();
     } 
         
     
       });
     
   }

  ngOnInit() {
   this.twoColumnBanners();
  }



  twoColumnBanners()
  {
    this.apiserv.twoColumnBanners().
    subscribe(
      data2 => {
this.isdata = true
 this.arrSlider = data2;
 console.log(this.arrSlider);
 this.image1 = this.arrSlider.banner_1.image.path;
   this.image2 = this.arrSlider.banner_2.image.path;
   //this.image3 = this.arrSlider.banner_3.image.path;


        //console.log('Data:', this.countryInfo);
      },
      err =>{
        console.log(err)
        this.isdata = true
      } ,
      () => console.log('complete')
    )
  }

}
