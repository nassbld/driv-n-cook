import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToInventoryModal } from './add-to-inventory-modal';

describe('AddToInventoryModal', () => {
  let component: AddToInventoryModal;
  let fixture: ComponentFixture<AddToInventoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToInventoryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToInventoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
