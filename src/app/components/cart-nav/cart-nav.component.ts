import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { CartNavDirection } from './cart-nav-direction';
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-cart-nav',
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartNavComponent implements OnInit {
  showSideCart: Observable<boolean>;

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = 90;
  @Input() direction: CartNavDirection = CartNavDirection.Left;
  
  constructor(private cartService: CartserviceService){}

  ngOnInit(): void {
    this.showSideCart = this.cartService.getShowCart();
  }

  onSidebarClose() {
    this.cartService.setShowCart(false);
  }

  getSideCartStyle(showNav: boolean) {
    let navBarStyle: any = {};
    
    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width =  '90vw';
    navBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';
    
    return navBarStyle;
  }
}

