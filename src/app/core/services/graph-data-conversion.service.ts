import { Injectable } from '@angular/core';
import { Olympic } from '../models/Olympic';
import { LineChartData, LineChartDataSerie } from '../models/LineChartData';
import { PieChartData } from '../models/PieChartData';

@Injectable({
  providedIn: 'root'
})
export class GraphDataConversionService {

  constructor() { }

  convertOlympicToLineChartData(olp: Olympic): LineChartData {
    return new Object({
      name: olp.country,
      series: olp.participations.map((p) => new Object({ name: p.year.toString(), value: p.medalsCount }) as LineChartDataSerie)
    }) as LineChartData;
  }

  convertOlympicToPieChartData(olympic: Olympic): PieChartData {
    return Object.assign({
      name: olympic.country,
      value: olympic.participations.reduce((tot, current) => tot + current.medalsCount, 0),
      extra: { id: olympic.id }
    }) as PieChartData
  }


}
