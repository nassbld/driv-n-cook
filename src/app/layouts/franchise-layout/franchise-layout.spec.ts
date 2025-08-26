import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseLayout } from './franchise-layout';

describe('FranchiseLayout', () => {
  let component: FranchiseLayout;
  let fixture: ComponentFixture<FranchiseLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
