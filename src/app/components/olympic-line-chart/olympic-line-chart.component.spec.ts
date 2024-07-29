import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicLineChartComponent } from './olympic-line-chart.component';


describe('OlympicLineChartComponent', () => {
  let component: OlympicLineChartComponent;
  let fixture: ComponentFixture<OlympicLineChartComponent>;

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
