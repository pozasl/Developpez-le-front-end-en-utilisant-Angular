import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { find, map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { NotificationMessage } from '../models/AppNotification';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap({
        next: (value) => this.olympics$.next(value),
        error: (error) => {
          // TODO: improve error handling
          // console.error(error);
          // can be useful to end loading state and let the user know something went wrong
          this.olympics$.error(error);
        }
      })
    );
  }

  /**
   * Get Olympic list
   * @returns an observable list of Olympic or null
   */
  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  /**
   * Get Olympic by its Id
   * @param id 
   * @returns 
   */
  getOlympicById(id:number): Observable<Olympic> {
    return this.getOlympics().pipe(map(
      (olps) => {
        if (!olps)
          throw new Error(NotificationMessage.NoData)
        const foundOlp = olps.find(olp => id === olp.id);
        if (!foundOlp)
          throw new Error(NotificationMessage.NoData)
        return foundOlp;
      }
    ));
  }


}
