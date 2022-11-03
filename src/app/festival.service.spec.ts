import { TestBed } from '@angular/core/testing';

import { FestivalService } from './festival.service';

describe('FestivalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FestivalService = TestBed.get(FestivalService);
    expect(service).toBeTruthy();
  });
});
