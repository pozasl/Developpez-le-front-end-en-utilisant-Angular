import { ComponentFixture, TestBedStatic } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { TestBedInitializer } from 'src/test';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  let TestBed:TestBedStatic;
  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
