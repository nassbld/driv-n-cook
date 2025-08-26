import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckManagement } from './truck-management';

describe('TruckManagement', () => {
  let component: TruckManagement;
  let fixture: ComponentFixture<TruckManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
