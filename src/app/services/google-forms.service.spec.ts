import { TestBed } from '@angular/core/testing';

import { GoogleFormsService } from './google-forms.service';

describe('GoogleFormsService', () => {
  let service: GoogleFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
