import {Component, inject, signal, WritableSignal} from '@angular/core';
import {WarehouseService} from '../../../core/services/warehouse';
import {toObservable} from '@angular/core/rxjs-interop';
import {InventoryItem} from '../../../core/models/inventory.model';
import {Warehouse} from '../../../core/models/warehouse.model';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {ManageStockModal} from '../../../components/manage-stock-modal/manage-stock-modal';
import {AddToInventoryModal} from '../../../components/add-to-inventory-modal/add-to-inventory-modal';

@Component({
  selector: 'app-warehouse-management',
  standalone: true,
  imports: [
    AsyncPipe,
    ManageStockModal,
    AddToInventoryModal
  ],
  templateUrl: './warehouse-management.html',
  styleUrl: './warehouse-management.css'
})
export class WarehouseManagement {
  private warehouseService = inject(WarehouseService);

  warehouses$ = this.warehouseService.getWarehouses();
  selectedWarehouse: WritableSignal<Warehouse | null> = signal(null);

  isManageStockModalOpen = signal(false);
  isAddToInventoryModalOpen = signal(false);
  itemToManage = signal<InventoryItem | null>(null);

  // Observable qui récupère l'inventaire de l'entrepôt sélectionné
  inventory$: Observable<InventoryItem[]> = toObservable(this.selectedWarehouse).pipe(
    switchMap(warehouse => warehouse ? this.warehouseService.getInventoryForWarehouse(warehouse.id) : of([]))
  );

  selectWarehouse(warehouse: Warehouse) {
    this.selectedWarehouse.set(warehouse);
  }

  openManageStockModal(item: InventoryItem) {
    this.itemToManage.set(item);
    this.isManageStockModalOpen.set(true);
  }

  openAddToInventoryModal() {
    this.isAddToInventoryModalOpen.set(true);
  }
}
