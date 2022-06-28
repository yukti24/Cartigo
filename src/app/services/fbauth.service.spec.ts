/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FbauthService } from './fbauth.service';

describe('Service: Fbauth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbauthService]
    });
  });

  it('should ...', inject([FbauthService], (service: FbauthService) => {
    expect(service).toBeTruthy();
  }));
});
