import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BigRedButtonComponent} from './big-red-button.component';

describe('BigRedButtonComponent', () => {
  let component: BigRedButtonComponent;
  let fixture: ComponentFixture<BigRedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigRedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigRedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
