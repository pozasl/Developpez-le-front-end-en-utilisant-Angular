// import { TestBed } from '@angular/core/testing';

import { TestBedInitializer } from 'src/test';
import { OlympicService } from './olympic.service';
import { TestBedStatic } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';

describe('OlympicService', () => {
  let service: OlympicService;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientModule]
    });

    service = TestBed.inject(OlympicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
