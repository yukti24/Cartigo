import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FeaturedCategoryComponent } from 'src/app/components/featured-category/featured-category.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { FeaturedCategoriesModule } from 'src/app/components/featured-categories/featured-categories.module';


@NgModule({
  imports: [
    CommonModule,
    
    
   
  ],
  exports: [  ],
  declarations: [HomeComponent, ProductCardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
