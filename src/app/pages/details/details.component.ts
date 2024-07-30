import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicLineChartComponent } from 'src/app/components/olympic-line-chart/olympic-line-chart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, OlympicLineChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  @Input() countryId: number = -1 ;
  olympics$: Observable<Olympic[] | null> = of(null);
  olympic: Olympic | null = null;
  countryName: string = "No country selected";
  entriesNbr: number = 0;
  totalMedalsNbr: number = 0
  totalAthletesNbr: number = 0
  loading:boolean = true;
  error:boolean = false;
  errorMsg:string = "";


  // Service dependencie by contructor injection
  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const sub = this.olympics$.subscribe({
      next: (ols)=> {
          if (this.countryId!== -1 && ols !== null)
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
          else {
            this.errorMsg = "Unknown country id";
            this.error = true;
          }
        this.loading = false;
      },
      error: (e) => {
        this.errorMsg = "Error feching data";
        this.error = true;
      },
    })
  }

}
