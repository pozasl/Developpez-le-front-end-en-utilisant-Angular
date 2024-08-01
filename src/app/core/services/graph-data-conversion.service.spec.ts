import { TestBed } from '@angular/core/testing';

import { GraphDataConversionService } from './graph-data-conversion.service';
import { PieChartData } from '../models/PieChartData';
import { LineChartData } from '../models/LineChartData';
import { Olympic } from '../models/Olympic';

describe('GraphDataConversionService', () => {
  let service: GraphDataConversionService;
  let olympic: Olympic = {
    id: 1,
    country: 'France',
    participations: [
      {
        id: 1,
        city: 'London',
        athleteCount: 50,
        medalsCount: 5,
        year: 2016
      },
      {
        id: 2,
        city: 'Tokyo',
        athleteCount: 20,
        medalsCount: 10,
        year: 2020
      }
    ]

  } as Olympic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphDataConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert olympic to PieChartData ', () => {
    const pcd: PieChartData = service.convertOlympicToPieChartData(olympic);
    expect(pcd).toEqual(Object({
      name: 'France',
      value: 15,
      extra: {
       id: 1
      }
    }) as PieChartData);
  })

  it('should convert olympic to LineChartData ', () => {
    const lcd: LineChartData = service.convertOlympicToLineChartData(olympic);
    expect(lcd).toEqual(Object({
      name: 'France',
      series: [
        {
          name: '2016',
          value: 5
        },
        {
          name: '2020',
          value: 10
        }
      ]
    }) as LineChartData)
  })
});
