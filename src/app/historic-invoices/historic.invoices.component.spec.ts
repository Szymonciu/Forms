import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricInvoicesComponent } from './historic.invoices.component';

describe('HistoryczneFakturyComponent', () => {
  let component: HistoricInvoicesComponent;
  let fixture: ComponentFixture<HistoricInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricInvoicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
