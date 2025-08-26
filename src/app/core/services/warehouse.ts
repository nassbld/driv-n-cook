import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, doc, Firestore, query, updateDoc, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {Warehouse} from '../models/warehouse.model';
import {InventoryItem} from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private firestore: Firestore = inject(Firestore);
  private warehousesCollection = collection(this.firestore, 'warehouses');

  getWarehouses(): Observable<Warehouse[]> {
    return collectionData(this.warehousesCollection, { idField: 'id' }) as Observable<Warehouse[]>;
  }

  getInventoryForWarehouse(warehouseId: string): Observable<InventoryItem[]> {
    const inventoryCollection = collection(this.firestore, 'inventory');
    const q = query(inventoryCollection, where('warehouseId', '==', warehouseId));
    return collectionData(q, { idField: 'id' }) as Observable<InventoryItem[]>;
  }

  async updateStock(itemId: string, newStock: number): Promise<void> {
    const itemRef = doc(this.firestore, `inventory/${itemId}`);
    await updateDoc(itemRef, { stock: newStock });
  }

  async addProductToInventory(warehouseId: string, product: { id: string, name: string }, initialStock: number): Promise<void> {
    const inventoryCollection = collection(this.firestore, 'inventory');
    await addDoc(inventoryCollection, {
      warehouseId: warehouseId,
      productId: product.id,
      productName: product.name,
      stock: initialStock
    });
  }
}
