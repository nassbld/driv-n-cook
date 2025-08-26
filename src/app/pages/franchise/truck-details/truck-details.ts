import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Truck } from '../../../core/models/truck.model';
import {TruckService} from '../../../core/services/truck';
import {AuthService} from '../../../core/services/auth';
import {MaintenanceLog} from '../../../core/models/maintenance-log.model';
import {MaintenanceService} from '../../../core/services/maintenance';
import {ReportIssueModal} from '../../../components/report-issue-modal/report-issue-modal';

@Component({
  selector: 'app-truck-details',
  standalone: true,
  imports: [CommonModule, ReportIssueModal],
  templateUrl: './truck-details.html',
  styleUrls: ['./truck-details.css']
})
export class TruckDetails {
  private authService = inject(AuthService);
  private truckService = inject(TruckService);
  private maintenanceService = inject(MaintenanceService);

  isReportModalOpen = signal(false);
  truckForReport = signal<Truck | null>(null);

  // On récupère le(s) camion(s) assigné(s) à l'utilisateur connecté
  assignedTrucks$: Observable<Truck[]> = this.authService.userProfile$.pipe(
    switchMap(profile => {
      if (profile && profile.uid) {
        return this.truckService.getTrucksForFranchise(profile.uid);
      }
      return of([]); // Si pas de profil, renvoyer un tableau vide
    })
  );

  maintenanceHistory$: Observable<MaintenanceLog[]> = this.assignedTrucks$.pipe(
    switchMap(trucks => {
      if (trucks.length > 0) {
        return this.maintenanceService.getLogsForTruck(trucks[0].id);
      }
      return of([]);
    })
  );

  openReportModal(truck: Truck) {
    this.truckForReport.set(truck);
    this.isReportModalOpen.set(true);
  }
}
