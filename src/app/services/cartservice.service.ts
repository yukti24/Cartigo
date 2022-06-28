import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService implements OnInit{

  private showCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.setShowCart(false);
    });
  }

  ngOnInit() {
  }

  getShowCart(){
    return this.showCart$.asObservable();
  }

  setShowCart(showHide: boolean) {
    
    this.showCart$.next(showHide);
  }

  toggleNavState() {
    this.showCart$.next(!this.showCart$.value);
  }

  isCartOpen() {
    return this.showCart$.value;
  }

}
