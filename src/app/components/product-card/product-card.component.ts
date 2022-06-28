import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productUrl:string='';
  baseImage:string='';
  wishlistclass:string='';
baseimgclass:string='';




  constructor() { }

  ngOnInit() {
  }

  addToCart()
  {
    
  }

  syncWishlist()
  {

  }

  syncCompareList()
  {
    
  }


}
