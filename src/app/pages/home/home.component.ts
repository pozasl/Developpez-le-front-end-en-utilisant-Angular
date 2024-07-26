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

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((ols)=> {
      if (ols !== null) {
        this.josNbr = ols?.reduce((tot, ol) => tot > ol.participations.length ? tot : ol.participations.length, 0)
        this.countriesNbr = ols.length
      }
      else {
        this.josNbr = 0;
        this.countriesNbr = 0;
      }
    })
  }

  onCountrySelect(countryNbr: number): void {
    console.log(countryNbr);
    this.router.navigate(['/details/' + countryNbr]);
  }
}
