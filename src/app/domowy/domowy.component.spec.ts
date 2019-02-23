import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomowyComponent } from './domowy.component';

describe('DomowyComponent', () => {
  let component: DomowyComponent;
  let fixture: ComponentFixture<DomowyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomowyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
