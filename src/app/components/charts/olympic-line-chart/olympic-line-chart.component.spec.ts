import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicLineChartComponent } from './olympic-line-chart.component';
import { Olympic } from 'src/app/core/models/Olympic';

describe('OlympicLineChartComponent', () => {
  let component: OlympicLineChartComponent;
  let fixture: ComponentFixture<OlympicLineChartComponent>;
  const olp:Olympic = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicLineChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate LineChart with empty array if olympic is null', () => {
    expect(component.lineChartData.length).toEqual(0);
  });

  it('should hydrate LineChart with empty data if olympic is null', () => {
    component.olympic = olp;
    expect(component.lineChartData.length).toEqual(1);
  });
});
