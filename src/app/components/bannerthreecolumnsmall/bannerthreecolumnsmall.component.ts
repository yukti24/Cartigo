import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-bannerthreecolumnsmall',
  templateUrl: './bannerthreecolumnsmall.component.html',
  styleUrls: ['./bannerthreecolumnsmall.component.scss']
})
export class BannerthreecolumnsmallComponent implements OnInit {

  arrSlider:any=[];
  image1:string='';
  image2:string='';
  image3:string='';
  @Input() isrefresh: boolean=false;
isData:boolean = false
  constructor(private apiserv: ApiservicesService,
    private router: Router) { 

    this.apiserv.pageRefresh.subscribe(x=> {
     
      let url = this.router.url;
      if(url === "/home")
     { 
     // this.threeColumnBanners();
     } 
         
     
       });
     
  }

  ngOnInit() {
    this.threeColumnBanners();
  }



  threeColumnBanners()
  {
    this.apiserv.threeColumnBanners().
    subscribe(
      data2 => {

 this.arrSlider = data2;
 console.log(this.arrSlider);
 this.image1 = this.arrSlider.banner_1.image.path;
   this.image2 = this.arrSlider.banner_2.image.path;
   this.image3 = this.arrSlider.banner_3.image.path;

this.isData = true
        //console.log('Data:', this.countryInfo);
      },
      err => {console.log(err)
        this.isData = false
      },
      () => console.log('complete')
    )
  }

}
