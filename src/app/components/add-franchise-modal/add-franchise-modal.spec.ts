import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFranchiseModal } from './add-franchise-modal';

describe('AddFranchiseModal', () => {
  let component: AddFranchiseModal;
  let fixture: ComponentFixture<AddFranchiseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFranchiseModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFranchiseModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
