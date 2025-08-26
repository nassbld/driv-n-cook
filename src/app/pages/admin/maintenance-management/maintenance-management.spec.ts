import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceManagement } from './maintenance-management';

describe('MaintenanceManagement', () => {
  let component: MaintenanceManagement;
  let fixture: ComponentFixture<MaintenanceManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
