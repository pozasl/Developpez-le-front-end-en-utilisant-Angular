import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicPieChartComponent } from './olympic-pie-chart.component';
import { Olympic } from 'src/app/core/models/Olympic';

describe('OlympicPieChartComponent', () => {
  let component: OlympicPieChartComponent;
  let fixture: ComponentFixture<OlympicPieChartComponent>;
  const olympics: Olympic[] = [
    {
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
          year: 2020,
        }
      ]
    },
    {
      id: 2,
      country: 'Spain',
      participations: [
        {
          id: 1,
          city: 'London',
          athleteCount: 35,
          medalsCount: 4,
          year: 2016
        },
        {
          id: 2,
          city: 'Tokyo',
          athleteCount: 25,
          medalsCount: 8,
          year: 2020
        }
      ]
    },
    {
      id: 3,
      country: 'Italy',
      participations: [
        {
          id: 1,
          city: 'London',
          athleteCount: 11,
          medalsCount: 3,
          year: 2016
        },
        {
          id: 2,
          city: 'Tokyo',
          athleteCount: 22,
          medalsCount: 4,
          year: 2020
        }
      ]
      ,
    }
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [OlympicPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate LineChart with empty array if olympic is null', () => {
    expect(component.chartData.length).toEqual(0);
  });

  it('should hydrate LineChart with empty data if olympic is null', () => {
    component.olympics = olympics;
    expect(component.chartData.length).toEqual(3);
  });
});
