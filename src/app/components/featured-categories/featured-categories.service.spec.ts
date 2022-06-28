/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeaturedCategoriesService } from './featured-categories.service';

describe('Service: FeaturedCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedCategoriesService]
    });
  });

  it('should ...', inject([FeaturedCategoriesService], (service: FeaturedCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
