import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryItem } from '../../core/models/inventory.model';
import {WarehouseService} from '../../core/services/warehouse';

@Component({
  selector: 'app-manage-stock-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-stock-modal.html',
  styleUrls: ['./manage-stock-modal.css']
})
export class ManageStockModal {
  @Input({ required: true }) item!: InventoryItem;
  @Output() close = new EventEmitter<void>();

  private warehouseService = inject(WarehouseService);
  newStock = signal(0);

  ngOnInit() {
    this.newStock.set(this.item.stock);
  }

  async onUpdateStock() {
    await this.warehouseService.updateStock(this.item.id, this.newStock());
    this.close.emit();
  }
}
