import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { NotificationMessage } from '../models/AppNotification';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap({
        next: (value) => this.olympics$.next(value),
        error: (error) => {
          console.error(error);
          throw new Error(NotificationMessage.NoData)
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
  getOlympicById(id: number): Observable<Olympic> {
    console.log("here->", this.olympics$.getValue());
    return this.getOlympics().pipe(map(
      (olps) => {
        if (olps === null)
          throw new Error(NotificationMessage.NoData)
        const foundOlp = olps.find(olp => id == olp.id);
        if (!foundOlp)
          throw new Error(NotificationMessage.WrongId)
        return foundOlp;
      }
    ));
  }


}
