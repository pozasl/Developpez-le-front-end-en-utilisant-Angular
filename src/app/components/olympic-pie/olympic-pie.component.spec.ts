import { ComponentFixture, TestBedStatic } from '@angular/core/testing';

import { OlympicPieComponent } from './olympic-pie.component';
import { TestBedInitializer } from 'src/test';

describe('OlympicPieComponent', () => {
  let component: OlympicPieComponent;
  let fixture: ComponentFixture<OlympicPieComponent>;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

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
