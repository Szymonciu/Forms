import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinedInvoicesComponent } from './defined-invoices-component';

describe('ZdefiniowaneFakturyComponent', () => {
  let component: DefinedInvoicesComponent;
  let fixture: ComponentFixture<DefinedInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefinedInvoicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
