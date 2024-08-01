import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';

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

  it('should have olympics populated from observable', () => {
    component.olympics$.subscribe(ols => {
      expect(ols).toBe(olympics);
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

  it('should set Counters to 0 if olympics Observable is null', () => {
    component.olympics$ = of(null);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Medals per Country');
  });


});
