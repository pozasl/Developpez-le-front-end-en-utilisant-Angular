import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import { provideHttpClient } from '@angular/common/http';
import { mergeMap, take } from 'rxjs';
import { NotificationMessage } from '../models/AppNotification';

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

  it('.loadInitialData should load Initial Data and return an Olympics Observable when datas are loaded', (done:DoneFn) => {
    const olympics = service.loadInitialData();
    olympics.subscribe((ols) => {
      expect(ols?.length).toEqual(5);
      done();
    });
  });

  it('.getOlympics should return an Olympics Observable when datas are loaded', (done:DoneFn) => {
    service.loadInitialData().pipe(take(1))
      .pipe(mergeMap(()=>service.getOlympics()))
      .subscribe((olps) => {
        expect(olps?.length).toEqual(5);
      done();
    });
  });

  it('getOlympics should return a Null Observable when datas are not loaded', (done:DoneFn) => {

    const olps$ = service.getOlympics()
    olps$.subscribe((olps) => {
      expect(olps).toBeNull();
      done();
    })
  });

  it('.getOlympicById should return an Olympic Observable when datas are loaded', (done:DoneFn) => {
    service.loadInitialData().pipe(take(1))
    .pipe(mergeMap(() => service.getOlympicById(2)))
    .subscribe((olp) => {
      expect(olp?.id).toEqual(2);
      done();
    });
  });

  it('.getOlympicById should return a Null Observable when id can\'t be found and datas are loaded', (done:DoneFn) => {
    service.loadInitialData().pipe(take(1))
    .pipe(mergeMap(() => service.getOlympicById(99)))
    .subscribe({
      error: (e:Error) => {
        expect(e.message).toBe(NotificationMessage.NoData)
        done();
      }
    });
  });

  it('getOlympicById should return an Error when datas are not loaded', (done:DoneFn) => {
    const olp$ = service.getOlympicById(2)
    olp$.subscribe({
      error: (e:Error) => {
        expect(e.message).toBe(NotificationMessage.NoData)
        done();
      }
    })
  });

});
