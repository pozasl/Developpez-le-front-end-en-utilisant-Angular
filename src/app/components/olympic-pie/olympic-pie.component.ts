import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { DataUtil } from 'src/app/core/utils/DataUtil';

@Component({
  selector: 'app-olympic-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './olympic-pie.component.html',
  styleUrl: './olympic-pie.component.scss'
})
export class OlympicPieComponent {
  @Input() set olympics(ol: Olympic[] | null) {
   this.chartData = (ol !== null) ? ol.map(DataUtil.convertOlympicToPieChartData) : []
  }
  @Output()
  countrySelectEvent = new EventEmitter<number>();

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
  
  onSelect(data:PieChartData): void {
    this.countrySelectEvent.emit(data.extra.id);
  }
}
