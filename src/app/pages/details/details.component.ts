import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicLineChartComponent } from 'src/app/components/charts/olympic-line-chart/olympic-line-chart.component';
import { OlympicHeaderComponent } from 'src/app/components/ui/olympic-header/olympic-header.component';
import { OlympicFooterComponent } from 'src/app/components/ui/olympic-footer/olympic-footer.component';
import { AppNotification, AppNotificationType, NotificationMessage } from 'src/app/core/models/AppNotification';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [OlympicHeaderComponent, OlympicFooterComponent, OlympicLineChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
/**
 * Details page for selected country
 */
export class DetailsComponent implements OnInit, OnDestroy {
  @Input() countryId: number = -1;
  olympics$: Observable<Olympic[] | null> = of(null);
  olympic: Olympic | null = null;
  countryName: string = "No country selected";
  entriesNbr: number = 0;
  totalMedalsNbr: number = 0
  totalAthletesNbr: number = 0
  loading: boolean = true;
  error: boolean = false;
  notification?: AppNotification;
  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscriptions.push(this.olympics$.subscribe({
      next: (ols) => {
        if (this.countryId !== -1 && ols !== null) {
          for (let ol of ols) {
            if (ol.id == this.countryId) {
              this.olympic = ol;
              this.countryName = ol.country;
              this.entriesNbr = ol.participations.length;
              this.totalMedalsNbr = ol.participations.reduce((tot, p) => tot + p.medalsCount, 0);
              this.totalAthletesNbr = ol.participations.reduce((tot, p) => tot + p.athleteCount, 0);
              break;
            };
          }
          this.notification = undefined;
          this.error = false;
        }
        else {
          this.notification = new AppNotification(AppNotificationType.Error, NotificationMessage.WrongId);
          this.error = true;
        }
        this.loading = false;
      },
      error: (e) => {
        this.notification = new AppNotification(AppNotificationType.Error, NotificationMessage.NoData);
        this.error = true;
      },
    }));
  }

}
