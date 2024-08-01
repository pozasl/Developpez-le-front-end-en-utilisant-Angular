import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicCounterBoxComponent } from './olympic-counter-box.component';

describe('OlympicCounterBoxComponent', () => {
  let component: OlympicCounterBoxComponent;
  let fixture: ComponentFixture<OlympicCounterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicCounterBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicCounterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
