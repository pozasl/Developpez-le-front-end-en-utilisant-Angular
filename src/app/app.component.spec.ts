import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OlympicPieChartComponent } from './components/charts/olympic-pie/olympic-pie-chart.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { NotificationMessage } from './core/models/AppNotification';

describe('AppComponent', () => {
  let olympicServiceStub = {
    loadInitialData: jasmine.createSpy('loadInitialData').and.returnValue(of(null))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HomeComponent,
        OlympicPieChartComponent
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

  it(`should not be ready before initilization`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.ready).toBeFalse();
  });

  it('should load Olympics data at initialization', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(olympicServiceStub.loadInitialData).toHaveBeenCalled();
  })

  describe('AppComponent ', () => {
    let olympicServiceStub = {
      loadInitialData: jasmine.createSpy('loadInitialData').and.returnValue(throwError(() => new Error(NotificationMessage.NoData)))
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          AppRoutingModule,
          HomeComponent,
          OlympicPieChartComponent
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


    it('should be in error and display an error notification', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      expect(app.error).toBeTrue();
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.msgError')?.textContent).toContain(NotificationMessage.NoData);

    })
  })

});
