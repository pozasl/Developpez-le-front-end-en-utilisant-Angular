import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  olympic!: Olympic;
  countryName: string = "No country selected";
  entriesNbr: number = 0;
  totalMedalsNbr: number = 0
  totalAthletesNbr: number = 0
  loading: boolean = true;
  error: boolean = false;
  notification?: AppNotification;
  olympic$!: Observable<Olympic>;
  private subscriptions: Subscription[] = [];


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['countryId'];
    this.olympic$ = this.olympicService.getOlympicById(this.countryId);
    this.subscriptions.push(this.olympic$.subscribe({
      next: (ol) => {
        this.displayOlympicDetails(ol);
      },
      error: (e) => {
        this.notifyError(e.message);
      },
    }));
  }

  private displayOlympicDetails(ol: Olympic): void {
    this.olympic = ol;
    this.loading = false;
    this.error = false;
    this.notification = undefined;
    this.countryName = ol.country;
    this.entriesNbr = ol.participations.length;
    this.totalMedalsNbr = ol.participations.reduce((tot, p) => tot + p.medalsCount, 0);
    this.totalAthletesNbr = ol.participations.reduce((tot, p) => tot + p.athleteCount, 0);
  }

  private notifyError(msg: NotificationMessage): void {
    this.notification = new AppNotification(AppNotificationType.Error, msg);
    this.error = true;
    this.loading = false;
  }
}
