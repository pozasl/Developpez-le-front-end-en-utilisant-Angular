import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicFooterComponent } from './olympic-footer.component';

describe('OlympicFooterComponent', () => {
  let component: OlympicFooterComponent;
  let fixture: ComponentFixture<OlympicFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
