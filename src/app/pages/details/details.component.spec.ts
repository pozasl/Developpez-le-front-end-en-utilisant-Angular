import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, RouterTestingModule],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title as No country selected when the country\'s id does not exists', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML);
    expect(compiled.querySelector('h1')?.textContent).toContain('No country selected');
  });

});
