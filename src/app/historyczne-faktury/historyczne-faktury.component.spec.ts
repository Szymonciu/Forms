import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryczneFakturyComponent } from './historyczne-faktury.component';

describe('HistoryczneFakturyComponent', () => {
  let component: HistoryczneFakturyComponent;
  let fixture: ComponentFixture<HistoryczneFakturyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryczneFakturyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryczneFakturyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
