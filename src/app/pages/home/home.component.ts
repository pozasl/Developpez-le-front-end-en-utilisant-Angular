import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicPieChartComponent } from 'src/app/components/charts/olympic-pie/olympic-pie-chart.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { OlympicHeaderComponent } from 'src/app/components/ui/olympic-header/olympic-header.component';
import { OlympicFooterComponent } from 'src/app/components/ui/olympic-footer/olympic-footer.component';
import { AppNotification, AppNotificationType, NotificationMessage } from 'src/app/core/models/AppNotification';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [AsyncPipe, OlympicHeaderComponent, OlympicFooterComponent, OlympicPieChartComponent],
  styleUrls: ['./home.component.scss'],
})
/**
 * Default olympic dashboard page
 */
export class HomeComponent implements OnInit {
  josNbr: Number = 0;
  countriesNbr: Number = 0;
  loading: boolean = true;
  notification?: AppNotification;
  error: boolean = false;
  public olympics$: Observable<Olympic[] | null> = of(null);
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const sub = this.olympics$.subscribe({
      next: (ols)=> {
        if (ols !== null) {
          this.josNbr = ols?.reduce((tot, ol) => tot > ol.participations.length ? tot : ol.participations.length, 0)
          this.countriesNbr = ols.length
        }
        this.loading = false;
      },
      error: (e:Error) => {
        this.notification = new AppNotification(AppNotificationType.Error, NotificationMessage.NoData);
        this.error = true;
      },
    });
    
  }

  onCountrySelect(countryNbr: number): void {
    this.router.navigate(['/details/' + countryNbr]);
  }

}
