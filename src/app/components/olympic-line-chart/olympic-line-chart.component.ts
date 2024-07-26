import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartData, LineChartDataSerie } from 'src/app/core/models/LineChartData';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-olympic-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './olympic-line-chart.component.html',
  styleUrl: './olympic-line-chart.component.scss'
})
export class OlympicLineChartComponent {
  @Input() set olympic(ol:Olympic | null) {
    if (ol !== null)
    {
      this.lineChartData = [this.convertOlympicToLineChartData(ol)];
      console.log(this.multi);
    }
    else
      this.lineChartData = [];
  }

  multi: LineChartData[] = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  }
];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {

  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  lineChartData:LineChartData[] = [];

  convertOlympicToLineChartData(olp:Olympic):LineChartData {
    return new Object({
      name: olp.country,
      series: olp.participations.map((p)=>new Object({name:p.year.toString(), value:p.medalsCount }) as LineChartDataSerie)
    }) as LineChartData;
    
  }
}
