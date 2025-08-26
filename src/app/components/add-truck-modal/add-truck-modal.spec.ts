import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckModal } from './add-truck-modal';

describe('AddTruckModal', () => {
  let component: AddTruckModal;
  let fixture: ComponentFixture<AddTruckModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTruckModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTruckModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
