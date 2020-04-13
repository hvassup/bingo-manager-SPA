import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BingoManagerComponent} from './bingo-manager.component';

describe('BingoManagerComponent', () => {
  let component: BingoManagerComponent;
  let fixture: ComponentFixture<BingoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
