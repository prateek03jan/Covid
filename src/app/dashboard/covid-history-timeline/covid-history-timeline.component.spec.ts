import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidHistoryTimelineComponent } from './covid-history-timeline.component';

describe('CovidHistoryTimelineComponent', () => {
  let component: CovidHistoryTimelineComponent;
  let fixture: ComponentFixture<CovidHistoryTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidHistoryTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidHistoryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
