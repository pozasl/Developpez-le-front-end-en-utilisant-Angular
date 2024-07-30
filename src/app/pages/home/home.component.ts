import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicPieComponent } from 'src/app/components/olympic-pie/olympic-pie.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [AsyncPipe, OlympicPieComponent],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  josNbr: Number = 0;
  countriesNbr: Number = 0;
  loading: boolean = true;
  error: boolean = false;
  errorMsg: string = "No error";

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const sub = this.olympics$.subscribe({
      next: (ols)=> {
        console.log(ols)
        if (ols !== null) {
          this.josNbr = ols?.reduce((tot, ol) => tot > ol.participations.length ? tot : ol.participations.length, 0)
          this.countriesNbr = ols.length
          this.error = false;
        }

        // this.loading = false;
      },
      error: (e) => {
        console.log(e)
        this.errorMsg = "Error feching data";
        this.error = true;
      },
      complete: () => console.log("got my data :)")
    });
    
  }

  onCountrySelect(countryNbr: number): void {
    this.router.navigate(['/details/' + countryNbr]);
  }

}
