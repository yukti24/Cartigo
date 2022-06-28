import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';


@Component({
  selector: 'app-featured-categories',
  templateUrl: './featured-categories.component.html',
  styleUrls: ['./featured-categories.component.scss']
})
export class FeaturedCategoriesComponent implements OnInit {

  data:any=[];
  @Input() public slug: string;
  @Input() isrefresh: boolean=false;

  arrCategory:any=[];
   title:string='';
   subtitle:string='';

  constructor(private apiserv: ApiservicesService,private router: Router) {

    this.apiserv.pageRefresh.subscribe(x=> {
      let url = this.router.url;
        if(url === "/home")
       { 
       
       //  this.featuredCategoriesSection();
       } 
     
         
     
       });
     
   }
 


  ngOnInit() {

    this.featuredCategoriesSection();
  }


  getProducts(navItem: any) {
    console.log(navItem);
    this.router.navigate(['/products'], { state: {cid: navItem.slug,name:navItem.name,type:'category'} });
  }

  featuredCategoriesSection() {
    // console.log(navItem.slug);
 
       this.apiserv.featuredCategoriesSection().
       subscribe(
         data2 => {
   
        

        
         this.title = data2.title;
         this.subtitle = data2.subtitle;
         this.arrCategory = data2.categories;
        console.log(data2)

       // this.featcategory.emit(true);

           //console.log('Data:', this.countryInfo);
         },
         err => console.log(err),
         () => console.log('complete')
       )
   }

  change(tab)
{
  
}


getcategory(){
  
  this.router.navigate(['/categories'])
}


}
