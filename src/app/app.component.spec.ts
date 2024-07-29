// import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBedStatic } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TestBedInitializer } from 'src/test';

describe('AppComponent', () => {

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [
      //   RouterModule,
      //   provideHttpClient(withInterceptorsFromDi())
      // ],
      declarations: [
        AppComponent
      ],
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Medals per Country');
  });
});
