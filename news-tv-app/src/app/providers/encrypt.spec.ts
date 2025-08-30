import { TestBed } from '@angular/core/testing';

import { EncryptService } from './encrypt';

describe('Encrypt', () => {
  let service: EncryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
