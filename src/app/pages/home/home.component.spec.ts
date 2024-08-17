import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { of, throwError } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { AppNotificationType, NotificationMessage } from 'src/app/core/models/AppNotification';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let olympicServiceStub: Partial<OlympicService>;
  const olympics: Olympic[] = [
    {
      id: 1,
      country: 'France',
      participations: [
        {
          id: 1,
          city: 'London',
          athleteCount: 50,
          medalsCount: 5,
          year: 2016
        },
        {
          id: 2,
          city: 'Tokyo',
          athleteCount: 20,
          medalsCount: 10,
          year: 2020,
        }
      ]
    },
    {
      id: 2,
      country: 'Spain',
      participations: [
        {
          id: 1,
          city: 'London',
          athleteCount: 35,
          medalsCount: 4,
          year: 2016
        },
        {
          id: 2,
          city: 'Tokyo',
          athleteCount: 25,
          medalsCount: 8,
          year: 2020
        }
      ]
    },
    {
      id: 3,
      country: 'Italy',
      participations: [
        {
          id: 1,
          city: 'London',
          athleteCount: 11,
          medalsCount: 3,
          year: 2016
        },
        {
          id: 2,
          city: 'Tokyo',
          athleteCount: 22,
          medalsCount: 4,
          year: 2020
        }
      ]
      ,
    }
  ];

  beforeEach(async () => {
    olympicServiceStub = {
      getOlympics: jasmine.createSpy('getOlympics').and.returnValue(of(olympics))
    };

    await TestBed.configureTestingModule({
      // declarations: [ HomeComponent ];
      imports: [HomeComponent],
      providers: [provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Olympics data at initialization', () => {
    component.ngOnInit();
    expect(olympicServiceStub.getOlympics).toHaveBeenCalled();
  })

  it('should have olympics populated from observable', (done:DoneFn) => {
    component.olympics$.subscribe(ols => {
      expect(ols).toBe(olympics);
      done();
    });
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Medals per Country');
  });

  it('should render Number of JOs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of JOs 2');
  });

  it('should render Number of countries', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Number of countries 3');
  });
});


describe('HomeComponent with failing service', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let olympicServiceStub: Partial<OlympicService>;

  beforeEach(async () => {
    olympicServiceStub = {
      getOlympics: jasmine.createSpy('getOlympics').and.returnValue(throwError(() => new Error(NotificationMessage.NoData)))
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be in error', () => {
    expect(component.error).toBeTrue();
  });

  it('should have an error notification', () => {
    expect(component.notification?.type).toEqual(AppNotificationType.Error);
    expect(component.notification?.message).toEqual(NotificationMessage.NoData);
  });

  it('should set Counters to 0 with null olympics Observable  ', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of JOs 0');
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Number of countries 0');
  });

});