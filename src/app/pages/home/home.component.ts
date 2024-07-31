import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicPieChartComponent } from 'src/app/components/charts/olympic-pie/olympic-pie-chart.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [AsyncPipe, OlympicPieChartComponent],
  styleUrls: ['./home.component.scss'],
})
/**
 * Default olympic dashboard page
 */
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
        if (ols !== null) {
          this.josNbr = ols?.reduce((tot, ol) => tot > ol.participations.length ? tot : ol.participations.length, 0)
          this.countriesNbr = ols.length
          this.error = false;
        }
        this.loading = false;
      },
      error: (e) => {
        this.errorMsg = "Error feching data";
        this.error = true;
      },
    });
    
  }

  onCountrySelect(countryNbr: number): void {
    this.router.navigate(['/details/' + countryNbr]);
  }

}
