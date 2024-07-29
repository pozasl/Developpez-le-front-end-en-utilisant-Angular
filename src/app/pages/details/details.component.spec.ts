import { ComponentFixture, TestBedStatic } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';
import { TestBedInitializer } from 'src/test';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
