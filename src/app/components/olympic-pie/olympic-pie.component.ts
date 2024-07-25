import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartData } from 'src/app/core/models/PieChartData';

@Component({
  selector: 'app-olympic-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './olympic-pie.component.html',
  styleUrl: './olympic-pie.component.scss'
})
export class OlympicPieComponent {
  @Input() set olympics(ol: Olympic[] | null) {
   this.chartData = (ol !== null) ? ol.map(this.convertOlympicToPieChartData) : []
  }
  @Output()
  countrySelectEvent = new EventEmitter<string>();

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  chartData: PieChartData[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  convertOlympicToPieChartData(olympic: Olympic): PieChartData {
    return Object.assign({
      name: olympic.country,
      value: olympic.participations.reduce((tot, current) => tot + current.medalsCount, 0)
    }) as PieChartData
  }
  
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.countrySelectEvent.emit(data.name);
  }

  // onActivate(data:any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data:any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
