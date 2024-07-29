import { ComponentFixture, TestBedStatic } from '@angular/core/testing';

import { OlympicLineChartComponent } from './olympic-line-chart.component';
import { TestBedInitializer } from 'src/test';

describe('OlympicLineChartComponent', () => {
  let component: OlympicLineChartComponent;
  let fixture: ComponentFixture<OlympicLineChartComponent>;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
