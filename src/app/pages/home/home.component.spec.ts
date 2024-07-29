import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let olympicServiceStub: Partial<OlympicService>;

  beforeEach(async () => {
    olympicServiceStub = {
      getOlympics: jasmine.createSpy('getOlympics').and.returnValue(of())
    };

    await TestBed.configureTestingModule({
      // declarations: [ HomeComponent ];
      imports:[ HomeComponent ],
      providers: [ provideHttpClient(), { provide: OlympicService, useValue: olympicServiceStub }]
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

  it('should should have olympics populated from observable', () => {
    component.olympics$.subscribe(ols => {
      expect(ols).toBe(null);
    });
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML);
    expect(compiled.querySelector('h1')?.textContent).toContain('Medals per Country');
  });
  
});
