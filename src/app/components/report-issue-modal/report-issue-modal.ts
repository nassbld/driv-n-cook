import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Truck } from '../../core/models/truck.model';
import {MaintenanceService} from '../../core/services/maintenance';

@Component({
  selector: 'app-report-issue-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-issue-modal.html',
  styleUrl: 'report-issue-modal.css'
})
export class ReportIssueModal {
  @Input({ required: true }) truck!: Truck;
  @Output() close = new EventEmitter<void>();

  private maintenanceService = inject(MaintenanceService);
  description = signal('');
  isLoading = signal(false);

  async onSubmit() {
    if (!this.description()) return;
    this.isLoading.set(true);
    await this.maintenanceService.reportIssue(this.truck, this.description());
    this.isLoading.set(false);
    this.close.emit();
  }
}
