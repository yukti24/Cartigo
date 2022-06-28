import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { HeaderSearchComponent } from '../header-search/header-search.component';
import { Router, NavigationEnd } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isloggedin = false;
cartno = 0;
title = 'example';
targetElement: Element;

  constructor(private router: Router,
    private navService: NavigationService,
    private cartService: CartserviceService,
    private filterService: FilterService,
    private accountService: ApiservicesService,
    
    ) { 

  if(localStorage.getItem("uid") !== null)
{
  this.isloggedin = true;
}
  

console.log(this.router.url);

 /* this.accountService.userCart.subscribe(x=> {
     console.log("gg")
     console.log(x);
     let arrcart = x;
     //let cart = arrcart.cart

     if(arrcart.cart.length >0){
       this.cartno =  arrcart.cart[0].products.length;
     } 

  });
*/



  }

  ngOnInit(): void {

    this.cartService.setShowCart(false);
  
  }

  myRefreshEvent(event: Subject<any>, message: string) {
    console.log(this.router.url);
   // this.getSlider();
     setTimeout(() => {
        // alert(message);
         event.next();
     }, 3000);
 }


getSlider()
{


  
  this.accountService.getsliderRef().
  subscribe(
    data2 => {



    

      //console.log('Data:', this.countryInfo);
    },
    err => console.log(err),
    () => console.log('complete')
  )
}



  toggleSideNav() {
   // alert("jj");
    this.navService.setShowNav(true);
  }

  toggleSideCart() {
    // alert("jj");
    this.cartService.setShowCart(true);
   // this.filterService.setShowFilter(true);
   }

}
