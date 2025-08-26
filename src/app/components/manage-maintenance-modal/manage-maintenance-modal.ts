import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceLog } from '../../core/models/maintenance-log.model';
import {MaintenanceService} from '../../core/services/maintenance';

@Component({
  selector: 'app-manage-maintenance-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-maintenance-modal.html',
  styleUrl: 'manage-maintenance-modal.css'
})
export class ManageMaintenanceModal {
  @Input({ required: true }) log!: MaintenanceLog;
  @Output() close = new EventEmitter<void>();

  private maintenanceService = inject(MaintenanceService);
  selectedStatus = signal<'signalée' | 'en_cours' | 'résolue'>('signalée');

  ngOnInit() {
    this.selectedStatus.set(this.log.status);
  }

  async onUpdateStatus() {
    await this.maintenanceService.updateLogStatus(this.log.id, this.selectedStatus());
    this.close.emit();
  }
}
