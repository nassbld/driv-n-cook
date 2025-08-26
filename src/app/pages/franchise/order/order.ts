import { Component, computed, inject, signal, WritableSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { OrderItem } from '../../../core/models/order.model';
import { take, switchMap, map } from 'rxjs/operators';
import { Warehouse } from '../../../core/models/warehouse.model';
import { combineLatest, Observable, of } from 'rxjs';
import {OrderService} from '../../../core/services/order';
import {AuthService} from '../../../core/services/auth';
import {WarehouseService} from '../../../core/services/warehouse';
import {toObservable} from '@angular/core/rxjs-interop';

interface ProductViewModel extends Product {
  stock: number;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class Order {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private warehouseService = inject(WarehouseService);

  // Signaux pour l'état
  warehouses$: Observable<Warehouse[]> = this.warehouseService.getWarehouses();
  selectedWarehouse: WritableSignal<Warehouse | null> = signal(null);
  cart: WritableSignal<Map<string, OrderItem>> = signal(new Map());

  // Observable qui réagit au changement du signal 'selectedWarehouse'
  productsInStock$: Observable<ProductViewModel[]> = toObservable(this.selectedWarehouse).pipe(
    switchMap(warehouse => {
      // Si aucun entrepôt n'est sélectionné, on retourne un tableau de produits vide.
      if (!warehouse || !warehouse.id) {
        return of([]);
      }
      // On combine la liste de tous les produits avec l'inventaire de l'entrepôt choisi.
      return combineLatest([
        this.orderService.getProducts(),
        this.warehouseService.getInventoryForWarehouse(warehouse.id)
      ]).pipe(
        map(([products, inventory]) => {
          return products.map(p => ({
            ...p,
            stock: inventory.find(i => i.productId === p.id)?.stock || 0
          }));
        })
      );
    })
  );

  // Signal calculé pour le total
  cartTotal: Signal<number> = computed(() => {
    let total = 0;
    for (const item of this.cart().values()) {
      total += item.quantity * item.unitPrice;
    }
    return total;
  });

  // Méthode pour sélectionner un entrepôt
  selectWarehouse(warehouseId: string) {
    this.warehouses$.pipe(take(1)).subscribe(warehouses => {
      this.selectedWarehouse.set(warehouses.find(w => w.id === warehouseId) || null);
      this.cart.set(new Map());
    });
  }

  // Méthode pour mettre à jour le panier
  updateCart(product: ProductViewModel, quantityStr: string) {
    const quantity = parseInt(quantityStr, 10);
    const newCart = new Map(this.cart());

    if (isNaN(quantity) || quantity <= 0) {
      newCart.delete(product.id);
      this.cart.set(newCart);
      return;
    }

    if (quantity > product.stock) {
      alert(`La quantité demandée (${quantity}) dépasse le stock disponible (${product.stock}).`);
      // Idéalement, on remet l'ancienne valeur dans l'input ou on le bloque
      return;
    }

    newCart.set(product.id, {
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      unitPrice: product.price
    });
    this.cart.set(newCart);
  }

  async placeOrder() {
    this.authService.userProfile$.pipe(take(1)).subscribe(async profile => {
      const warehouse = this.selectedWarehouse();
      if (profile && warehouse && this.cart().size > 0) {
        const items = Array.from(this.cart().values());
        await this.orderService.placeOrder(profile, items, this.cartTotal(), warehouse);
        alert('Commande passée avec succès !');
        this.cart.set(new Map());
      }
    });
  }
}
