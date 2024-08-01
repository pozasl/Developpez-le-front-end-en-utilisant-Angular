import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { Olympic } from 'src/app/core/models/Olympic';
import { GraphDataConversionService } from 'src/app/core/services/graph-data-conversion.service';

@Component({
  selector: 'app-olympic-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './olympic-line-chart.component.html',
  styleUrl: './olympic-line-chart.component.scss'
})
/**
 * Display a line chart from a country's olympic data
 */
export class OlympicLineChartComponent {
  @Input() set olympic(ol:Olympic | null) {
    if (ol !== null)
    {
      this.lineChartData = [this.conversionService.convertOlympicToLineChartData(ol)];
    }
    else
      this.lineChartData = [];
  }
  constructor(private conversionService:GraphDataConversionService) {}
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  tooltipDisabled: boolean = true;
  lineChartData:LineChartData[] = [];

}
