import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClockComponent} from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return random number from range 0-7', () => {
    expect(component.randomIntFromInterval(0, 7)).toBeGreaterThanOrEqual(0);
    expect(component.randomIntFromInterval(0, 7)).toBeLessThanOrEqual(7);
  });
});
