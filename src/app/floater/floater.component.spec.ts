import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FloaterComponent} from './floater.component';

describe('FloaterComponent', () => {
  let component: FloaterComponent;
  let fixture: ComponentFixture<FloaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
