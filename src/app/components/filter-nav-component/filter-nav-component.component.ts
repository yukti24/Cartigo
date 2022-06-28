import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { FilterNavDirection } from '../filter-nav/filter-nav-direction';
import { FilterService } from 'src/app/services/filter.service';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-filter-nav-component',
  templateUrl: './filter-nav-component.component.html',
  styleUrls: ['./filter-nav-component.component.scss']
})
export class FilterNavComponentComponent implements OnInit {

arrBrand:any=[];
  value: number = 0;
  highValue: number = 3050;
  options: Options = {
    floor: 0,
    ceil: 3050
  };
  


  showFilter: Observable<boolean>;

  constructor(private filterService: FilterService,
    private apiserv: ApiservicesService){}

  ngOnInit(): void {

    this.getAllBrands();
   // this.sh9owFilter = this.filterService.getShowFilter();
  }

  getBrandVal(slug)
  {
    this.filterService.setFilterBrandVal(slug)
  }

  gethighvalue()
  {
   // console.log(this.highValue)
    this.filterService.setFilterHighVal(this.highValue.toString())
      //this.highvaluechange.emit(this.highValue);
  }
  getlowvalue()
  {
    this.filterService.setFilterLowVal(this.value.toString())

     //this.lowvaluechange.emit(this.value);
  }

  getAllBrands()
  {
    this.apiserv.allBrands().
    subscribe(
      data2 => {
 
     
 
     
 this.arrBrand = Object.values(data2) ;
 console.log(this.arrBrand);
 console.log("this.arrBrand");
    

   //this.slides1.concat(this.slides);

        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

}
