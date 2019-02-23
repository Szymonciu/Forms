import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdefiniowaneFakturyComponent } from './zdefiniowane-faktury.component';

describe('ZdefiniowaneFakturyComponent', () => {
  let component: ZdefiniowaneFakturyComponent;
  let fixture: ComponentFixture<ZdefiniowaneFakturyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZdefiniowaneFakturyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdefiniowaneFakturyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
