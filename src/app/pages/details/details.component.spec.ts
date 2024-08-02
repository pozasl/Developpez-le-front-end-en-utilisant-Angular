import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppNotificationType, NotificationMessage } from 'src/app/core/models/AppNotification';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
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
      getOlympicById: jasmine.createSpy('getOlympicById').and.returnValue(of(olympics[1]),)
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent, AppRoutingModule, NoopAnimationsModule],
      providers: [provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Olympic data onInitilization', () => {
    component.ngOnInit()
    expect(olympicServiceStub.getOlympicById).toHaveBeenCalled();
  })

  it('should render title with country\'s name when countryId exists', () => {
    component.countryId = 2;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(olympics[1].country);
  });

  it('should render Number of entries when countryId exists', () => {
    component.countryId = 2;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of entries 2');
  });

  it('should render Total number of medals when countryId exists', () => {
    component.countryId = 2;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter >  p:nth-of-type(2)')?.textContent).toContain('Total number of medals 12');
  });

  it('should render Total number of athletes ', () => {
    component.countryId = 2;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Total number of athletes 60');
  });
  
});


describe('DetailsComponent when getOlympicById returns null (id not found)', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let olympicServiceStub: Partial<OlympicService>;

  beforeEach(async () => {
    olympicServiceStub = {
      getOlympicById: jasmine.createSpy('getOlympicById').and.returnValue(of(null),)
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent, AppRoutingModule, NoopAnimationsModule],
      providers: [provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should render title as No country selected and set counters to 0', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('No country selected');
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of entries 0');
    expect(compiled.querySelector('section.dashboardCounter >  p:nth-of-type(2)')?.textContent).toContain('Total number of medals 0');
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Total number of athletes 0');
  });

});

describe('DetailsComponent when getOlympicById returns error', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let olympicServiceStub: Partial<OlympicService>;

  beforeEach(async () => {
    olympicServiceStub = {
      getOlympicById: jasmine.createSpy('getOlympicById').and.returnValue(throwError(() => new Error(NotificationMessage.NoData)))
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent, AppRoutingModule, NoopAnimationsModule],
      providers: [provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should render title as No country selected and set counters to 0', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('No country selected');
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of entries 0');
    expect(compiled.querySelector('section.dashboardCounter >  p:nth-of-type(2)')?.textContent).toContain('Total number of medals 0');
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Total number of athletes 0');
  });

  it('should notify a NoData error', () => {
    fixture.detectChanges();
    expect(component.notification?.type).toBe(AppNotificationType.Error);
    expect(component.notification?.message).toBe(NotificationMessage.NoData);
  });

});