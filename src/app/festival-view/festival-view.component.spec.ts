import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalViewComponent } from './festival-view.component';

describe('FestivalViewComponent', () => {
  let component: FestivalViewComponent;
  let fixture: ComponentFixture<FestivalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FestivalViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
