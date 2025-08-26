import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTruckModal } from './manage-truck-modal';

describe('ManageTruckModal', () => {
  let component: ManageTruckModal;
  let fixture: ComponentFixture<ManageTruckModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTruckModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTruckModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
