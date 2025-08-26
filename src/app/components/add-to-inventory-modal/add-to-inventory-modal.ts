import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {Warehouse} from '../../core/models/warehouse.model';
import {OrderService} from '../../core/services/order';
import {WarehouseService} from '../../core/services/warehouse';
import {take} from 'rxjs/operators';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-add-to-inventory-modal',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './add-to-inventory-modal.html',
  styleUrl: './add-to-inventory-modal.css'
})
export class AddToInventoryModal {
  @Input({ required: true }) warehouse!: Warehouse;
  @Output() close = new EventEmitter<void>();

  private productService = inject(OrderService); // Le service qui a getProducts()
  private warehouseService = inject(WarehouseService);

  allProducts$ = this.productService.getProducts();
  selectedProductId = signal('');
  initialStock = signal(0);

  async onAddToInventory() {
    this.allProducts$.pipe(take(1)).subscribe(async products => {
      const selectedProduct = products.find(p => p.id === this.selectedProductId());
      if (selectedProduct) {
        await this.warehouseService.addProductToInventory(this.warehouse.id, selectedProduct, this.initialStock());
        this.close.emit();
      }
    });
  }
}
