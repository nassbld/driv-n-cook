import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Truck } from '../../core/models/truck.model';
import {TruckService} from '../../core/services/truck';
import {FranchiseService} from '../../core/services/franchise';

@Component({
  selector: 'app-manage-truck-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-truck-modal.html',
  styleUrls: ['./manage-truck-modal.css']
})
export class ManageTruckModal {
  @Input({ required: true }) truck!: Truck;
  @Output() close = new EventEmitter<void>();

  private truckService = inject(TruckService);
  private franchiseService = inject(FranchiseService);

  franchises$ = this.franchiseService.getFranchises();
  selectedFranchiseId = signal<string | null>(null);

  ngOnInit() {
    // Initialiser la sélection avec l'ID actuel du franchisé
    this.selectedFranchiseId.set(this.truck.franchiseId);
  }

  async onAssign() {
    await this.truckService.updateTruckAssignment(this.truck.id, this.selectedFranchiseId());
    this.close.emit();
  }
}
