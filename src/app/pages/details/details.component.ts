import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { AsyncPipe } from '@angular/common';
import { OlympicLineChartComponent } from 'src/app/components/olympic-line-chart/olympic-line-chart.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AsyncPipe, OlympicLineChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Input() set countryId(id:number) {
    const olympics$:Observable<Olympic[] | null> = this.olympicService.getOlympics();
    const sub = olympics$.subscribe((ols)=> {
      if (ols !== null)
        for (let ol of ols) {
          if (ol.id == id)
            {
              this.olympic = ol;
              this.countryName = ol.country;
              this.entriesNbr = ol.participations.length;
              this.totalMedalsNbr = ol.participations.reduce((tot, p) => tot + p.medalsCount,0)
              this.totalAthletesNbr = ol.participations.reduce((tot, p) => tot + p.athleteCount,0)
            };
        }
          
    })
    
  };
  olympic: Olympic | null = null;
  countryName: string = "No country selected";
  entriesNbr: number = 0;
  totalMedalsNbr: number = 0
  totalAthletesNbr: number = 0

  // Service dependencie by contructor injection
  constructor(private olympicService:OlympicService) {}
  
}
