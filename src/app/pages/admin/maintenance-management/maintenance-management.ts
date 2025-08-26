import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceLog } from '../../../core/models/maintenance-log.model';
import { ManageMaintenanceModal } from '../../../components/manage-maintenance-modal/manage-maintenance-modal';
import {MaintenanceService} from '../../../core/services/maintenance';

@Component({
  selector: 'app-maintenance-management',
  standalone: true,
  imports: [CommonModule, ManageMaintenanceModal],
  templateUrl: './maintenance-management.html',
  styleUrls: ['./maintenance-management.css']
})
export class MaintenanceManagement {
  private maintenanceService = inject(MaintenanceService);

  logs$ = this.maintenanceService.getAllLogs();
  isModalOpen = signal(false);
  selectedLog = signal<MaintenanceLog | null>(null);

  openModal(log: MaintenanceLog) {
    this.selectedLog.set(log);
    this.isModalOpen.set(true);
  }
}
