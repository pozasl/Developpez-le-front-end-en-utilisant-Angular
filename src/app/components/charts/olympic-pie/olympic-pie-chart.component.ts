import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { DataUtil } from 'src/app/core/utils/DataUtil';
import { GraphDataConversionService } from 'src/app/core/services/graph-data-conversion.service';

@Component({
  selector: 'app-olympic-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './olympic-pie-chart.component.html',
  styleUrl: './olympic-pie-chart.component.scss'
})
/**
 * Display a PieChart from Olympic data and emit selected country's id
 */
export class OlympicPieChartComponent {
  @Input() set olympics(ol: Olympic[] | null) {
   this.chartData = (ol !== null) ? ol.map(this.conversionService.convertOlympicToPieChartData) : []
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

  constructor(private conversionService:GraphDataConversionService) {}
  
  /**
   * PieChart's selection callback
   * @param data The selected PieChart data
   */
  onSelect(data:PieChartData): void {
    this.countrySelectEvent.emit(data.extra.id);
  }
}
