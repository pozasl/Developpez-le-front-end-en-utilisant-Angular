import { ComponentFixture, TestBedStatic } from '@angular/core/testing';

import { HomeComponent } from './home.component';
// import { HttpClientModule } from '@angular/common/http';
import { TestBedInitializer } from 'src/test';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ HomeComponent ];
      imports:[ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
