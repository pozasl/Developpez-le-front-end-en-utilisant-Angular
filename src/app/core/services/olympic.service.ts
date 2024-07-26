import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  /**
   * Get Olympic list
   * @returns an observable list of Olympic or null
   */
  getOlympics(): Observable<Olympic[] | null> {
    console.log("olps[]");
    return this.olympics$.asObservable();
  }

  // /**
  //  * Get an olympic by its id
  //  * @param id 
  //  * @returns an Olympic or null observable
  //  */
  // getOlympicByCountryId(id: number):Observable<Olympic | null> {
  //   return this.olympics$.    pipe(map(olps => {
  //     console.log("olps", olps);
  //     if (olps)
  //       for (let olp of olps)
  //         if (olp.id === id) return olp;
  //     return null;
  //   }));
  // }
}
