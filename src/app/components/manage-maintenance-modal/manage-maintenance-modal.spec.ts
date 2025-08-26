import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMaintenanceModal } from './manage-maintenance-modal';

describe('ManageMaintenanceModal', () => {
  let component: ManageMaintenanceModal;
  let fixture: ComponentFixture<ManageMaintenanceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMaintenanceModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMaintenanceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
