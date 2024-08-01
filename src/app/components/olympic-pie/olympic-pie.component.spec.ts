import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicPieComponent } from './olympic-pie.component';

describe('OlympicPieComponent', () => {
  let component: OlympicPieComponent;
  let fixture: ComponentFixture<OlympicPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
