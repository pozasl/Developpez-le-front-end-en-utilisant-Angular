import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
      getOlympics: jasmine.createSpy('getOlympics').and.returnValue(of(olympics))
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

  it('should get Olympics data onInitilization', () => {
    component.ngOnInit()
    expect(olympicServiceStub.getOlympics).toHaveBeenCalled();
  })

  it('should render title as No country selected and set counters to 0 when the country\'s is not set', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('No country selected');
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of entries 0');
    expect(compiled.querySelector('section.dashboardCounter >  p:nth-of-type(2)')?.textContent).toContain('Total number of medals 0');
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Total number of athletes 0');
  });

  it('should render title as No country selected and set counters to 0 when the country\'s id does not exists', () => {
    component.countryId = 99;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('No country selected');
    expect(compiled.querySelector('section.dashboardCounter > p:first-of-type')?.textContent).toContain('Number of entries 0');
    expect(compiled.querySelector('section.dashboardCounter >  p:nth-of-type(2)')?.textContent).toContain('Total number of medals 0');
    expect(compiled.querySelector('section.dashboardCounter > p:last-of-type')?.textContent).toContain('Total number of athletes 0');
  });

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
