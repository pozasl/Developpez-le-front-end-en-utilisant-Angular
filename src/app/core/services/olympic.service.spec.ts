import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import { provideHttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';

describe('OlympicService', () => {
  let service: OlympicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(OlympicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('.loadInitialData should load Initial Data and return an Olympics Observable when datas are loaded', () => {
    const olympics = service.loadInitialData();
    olympics.subscribe((ols) => {
      expect(ols?.length).toEqual(5);
    });
  });

  it('.getOlympics should return an Olympics Observable when datas are loaded', async() => {
    
    const olps$ = service.loadInitialData().pipe(take(1)).pipe(tap(
      () => {
        return service.getOlympics()
      }));

    olps$.subscribe((olps) => {
      expect(olps.length).toEqual(5);
    })
  });

  it('getOlympics should return a Null Observable when datas are not loaded', async() => {
    
    const olps$ = service.getOlympics()

    olps$.subscribe((olps) => {
      expect(olps).toBeNull();
    })
  });

});
