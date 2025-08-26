import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIssueModal } from './report-issue-modal';

describe('ReportIssueModal', () => {
  let component: ReportIssueModal;
  let fixture: ComponentFixture<ReportIssueModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIssueModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportIssueModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
