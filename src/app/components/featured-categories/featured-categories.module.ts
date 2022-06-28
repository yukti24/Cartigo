import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedCategoriesComponent } from './featured-categories.component';
import { FeaturedCategoriesService } from './featured-categories.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FeaturedCategoriesComponent],
  exports: [  
    FeaturedCategoriesComponent  
],  
providers: [  
  FeaturedCategoriesService  
]  
})
export class FeaturedCategoriesModule { }
