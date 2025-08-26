import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockModal } from './manage-stock-modal';

describe('ManageStockModal', () => {
  let component: ManageStockModal;
  let fixture: ComponentFixture<ManageStockModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStockModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStockModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
