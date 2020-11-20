import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FloaterComponent} from './floater.component';

describe('FloaterComponent', () => {
  let component: FloaterComponent;
  let fixture: ComponentFixture<FloaterComponent>;

  beforeEach(waitForAsync(() => {
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
