import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicLineChartComponent } from 'src/app/components/charts/olympic-line-chart/olympic-line-chart.component';
import { OlympicHeaderComponent } from 'src/app/components/ui/olympic-header/olympic-header.component';
import { OlympicFooterComponent } from 'src/app/components/ui/olympic-footer/olympic-footer.component';
import { AppNotification, AppNotificationType, NotificationMessage } from 'src/app/core/models/AppNotification';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [OlympicHeaderComponent, OlympicFooterComponent, OlympicLineChartComponent, AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
/**
 * Details page for selected country
 */
export class DetailsComponent implements OnInit, OnDestroy {
  countryId: number = -1;
  olympic$!: Observable<Olympic>;
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

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.olympic$ = this.olympicService.getOlympicById(this.countryId);
    this.subscriptions.push(this.olympic$.subscribe({
      next: (ol) => {
        this.error = false;
        this.countryName = ol.country;
        this.entriesNbr = ol.participations.length;
        this.totalMedalsNbr = ol.participations.reduce((tot, p) => tot + p.medalsCount, 0);
        this.totalAthletesNbr = ol.participations.reduce((tot, p) => tot + p.athleteCount, 0);
      },
      error: (e) => {
        this.notification = new AppNotification(AppNotificationType.Error, e.message);
        this.error = true;

      },
      complete: () => this.loading = false
    }));
  }
}
