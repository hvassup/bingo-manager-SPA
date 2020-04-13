import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DisconnectedOverlayComponent} from './disconnected-overlay.component';

describe('DisconnectedOverlayComponent', () => {
  let component: DisconnectedOverlayComponent;
  let fixture: ComponentFixture<DisconnectedOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectedOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
