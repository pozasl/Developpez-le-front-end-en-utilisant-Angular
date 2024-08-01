import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicHeaderComponent } from './olympic-header.component';

describe('OlympicHeaderComponent', () => {
  let component: OlympicHeaderComponent;
  let fixture: ComponentFixture<OlympicHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
