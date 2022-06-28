/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiservicesService } from './apiservices.service';

describe('Service: Apiservices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiservicesService]
    });
  });

  it('should ...', inject([ApiservicesService], (service: ApiservicesService) => {
    expect(service).toBeTruthy();
  }));
});
