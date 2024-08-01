import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';

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

}
