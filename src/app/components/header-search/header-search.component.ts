import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

   headerformcls:string = 'header-search-sm-form';
   srchkey:string='';
arrSearch:any=[];
selectedCategory=0;
  constructor(private apiserv: ApiservicesService,
    private router: Router) { }

  ngOnInit() {
  }

  showsearchformm()
  {
    this.headerformcls = 'header-search-sm-form active' ;
  }


  hidesearchformm()
  {
    this.headerformcls = 'header-search-sm-form' ;
  }
  valuechange()
  {
  console.log(this.srchkey)

  this.getSearchResult(this.srchkey)
  }


  getSearchResult(srch)
  {
   this.apiserv.getSearchResult(srch).
   subscribe(
     data2 => {

    

    
this.arrSearch = data2;
console.log(this.arrSearch);
     

       //console.log('Data:', this.countryInfo);
     },
     err => console.log(err),
     () => console.log('complete')
   )
  }

  gotoCategory(navItem)
  {this.hidesearchformm()
    this.router.navigate(['/products'], { state: {cid: navItem.slug,name:navItem.name,type:'category'} });

  }
  gotoProducts()
  {
    this.hidesearchformm()
    this.router.navigate(['/products'], { state: {query: this.srchkey,type:'query'} });

  }

  gotoProduct(slug)
  {this.hidesearchformm()
    this.router.navigate(['/product-detail'], { state: {slug: slug,type:'product'} });

  }

  hasBaseImage(product) {
    return product.base_image.length !== 0;
}

}
