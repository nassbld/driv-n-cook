import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTruckModal } from '../../../components/add-truck-modal/add-truck-modal';
import { combineLatest, map, Observable } from 'rxjs'; // Importer les outils RxJS
import { Truck } from '../../../core/models/truck.model';
import {TruckService} from '../../../core/services/truck';
import {FranchiseService} from '../../../core/services/franchise';
import {ManageTruckModal} from '../../../components/manage-truck-modal/manage-truck-modal';

// On peut définir une interface pour notre modèle de vue enrichi
interface TruckViewModel extends Truck {
  franchiseName: string;
}

@Component({
  selector: 'app-truck-management',
  standalone: true,
  imports: [CommonModule, AddTruckModal, ManageTruckModal],
  templateUrl: './truck-management.html',
  styleUrls: ['./truck-management.css']
})
export class TruckManagement {
  private truckService = inject(TruckService);
  private franchiseService = inject(FranchiseService); // Injecter le service

  // L'observable enrichi
  trucks$: Observable<TruckViewModel[]>;

  isManageModalOpen = signal(false);
  truckToManage = signal<Truck | null>(null);

  isModalOpen = signal(false);

  constructor() {
    const trucks$ = this.truckService.getTrucks();
    const franchises$ = this.franchiseService.getFranchises();

    // On combine les deux flux de données
    this.trucks$ = combineLatest([trucks$, franchises$]).pipe(
      map(([trucks, franchises]) => {
        // Pour chaque camion, on cherche le nom du franchisé correspondant
        return trucks.map(truck => ({
          ...truck,
          franchiseName: franchises.find(f => f.id === truck.franchiseId)?.name || 'Non attribué'
        }));
      })
    );
  }

  openManageModal(truck: Truck) {
    this.truckToManage.set(truck);
    this.isManageModalOpen.set(true);
  }
}
