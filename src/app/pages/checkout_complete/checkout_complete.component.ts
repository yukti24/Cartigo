import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-checkout_complete',
  templateUrl: './checkout_complete.component.html',
  styleUrls: ['./checkout_complete.component.scss']
})
export class Checkout_completeComponent implements OnInit {

  routeState: any;
 id:string =''

  constructor( private router: Router) { 

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
       // this.cid = this.routeState.cid;
        this.id = this.routeState.orderid;

      }
    }




  }

  ngOnInit() {
  }

}
