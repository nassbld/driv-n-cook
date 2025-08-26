// src/app/core/order.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit, where, doc, getDocs, runTransaction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import {UserProfile} from './auth';
import {Order, OrderItem} from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private firestore: Firestore = inject(Firestore);

  // Récupère la liste de tous les produits disponibles
  getProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  // Crée une nouvelle commande dans Firestore
  async placeOrder(franchise: UserProfile, items: OrderItem[], totalPrice: number, warehouse: { id: string, name: string }): Promise<void> {
    try {
      // On utilise une transaction pour garantir la cohérence des données
      await runTransaction(this.firestore, async (transaction) => {
        const ordersCollection = collection(this.firestore, 'orders');
        const inventoryCollection = collection(this.firestore, 'inventory');

        // Étape 1 : Vérifier les stocks dans la transaction
        for (const item of items) {
          const inventoryQuery = query(inventoryCollection, where('warehouseId', '==', warehouse.id), where('productId', '==', item.productId));
          const inventorySnap = await getDocs(inventoryQuery); // Note: getDocs, pas transaction.get

          if (inventorySnap.empty || inventorySnap.docs[0].data()['stock'] < item.quantity) {
            throw new Error(`Stock insuffisant pour le produit : ${item.productName}`);
          }
        }

        // Étape 2 : Créer la commande
        const newOrderRef = doc(ordersCollection); // Crée une référence avec un nouvel ID
        transaction.set(newOrderRef, {
          franchiseId: franchise.uid,
          franchiseName: franchise.name,
          date: serverTimestamp(),
          items: items,
          totalPrice: totalPrice,
          status: 'en_attente',
          warehouseId: warehouse.id,
          warehouseName: warehouse.name
        });

        // Étape 3 : Mettre à jour les stocks
        for (const item of items) {
          const inventoryQuery = query(inventoryCollection, where('warehouseId', '==', warehouse.id), where('productId', '==', item.productId));
          const inventorySnap = await getDocs(inventoryQuery);
          const inventoryDocRef = inventorySnap.docs[0].ref;
          const currentStock = inventorySnap.docs[0].data()['stock'];
          transaction.update(inventoryDocRef, { stock: currentStock - item.quantity });
        }
      });
    } catch (e) {
      console.error("La transaction a échoué: ", e);
      throw e; // Renvoyer l'erreur pour que le composant puisse l'afficher
    }
  }

  getAllOrders(): Observable<Order[]> {
    const ordersCollection = collection(this.firestore, 'orders');
    const q = query(ordersCollection, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Order[]>;
  }

  getOrdersForFranchise(franchiseId: string, count: number = 5): Observable<Order[]> {
    const ordersCollection = collection(this.firestore, 'orders');
    const q = query(
      ordersCollection,
      where('franchiseId', '==', franchiseId),
      orderBy('date', 'desc'),
      limit(count)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Order[]>;
  }
}
