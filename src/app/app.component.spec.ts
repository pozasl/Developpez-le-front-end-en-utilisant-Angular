import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OlympicPieComponent } from './components/olympic-pie/olympic-pie.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

describe('AppComponent', () => {
  let router: Router;
  let olympicServiceStub = {
    loadInitialData: jasmine.createSpy('loadInitialData').and.returnValue(of())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HomeComponent,
        OlympicPieComponent
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: OlympicService, useValue: olympicServiceStub }
        
      ]
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'olympic-games-starter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('olympic-games-starter');
  });

  it('should load Olympics data at initialization', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(olympicServiceStub.loadInitialData).toHaveBeenCalled();
  })

});
