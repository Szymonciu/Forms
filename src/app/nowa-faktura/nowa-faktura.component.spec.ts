import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowaFakturaComponent } from './nowa-faktura.component';

describe('NowaFakturaComponent', () => {
  let component: NowaFakturaComponent;
  let fixture: ComponentFixture<NowaFakturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowaFakturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowaFakturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
