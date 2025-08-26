import { Injectable, inject } from '@angular/core';
import {Firestore, collection, collectionData, addDoc, doc, updateDoc, query, where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Truck } from '../models/truck.model';

@Injectable({ providedIn: 'root' })
export class TruckService {
  private firestore: Firestore = inject(Firestore);
  private trucksCollection = collection(this.firestore, 'trucks');

  getTrucks(): Observable<Truck[]> {
    return collectionData(this.trucksCollection, { idField: 'id' }) as Observable<Truck[]>;
  }

  /**
   * Ajoute un nouveau document camion dans la collection 'trucks'.
   */
  async addTruck(truckData: { licensePlate: string; model: string }): Promise<void> {
    try {
      await addDoc(this.trucksCollection, {
        licensePlate: truckData.licensePlate,
        model: truckData.model,
        status: 'in_service', // Statut par défaut à la création
        franchiseId: null      // Non attribué par défaut
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du camion:", error);
      throw error;
    }
  }

  async updateTruckAssignment(truckId: string, franchiseId: string | null): Promise<void> {
    const truckDocRef = doc(this.firestore, `trucks/${truckId}`);
    await updateDoc(truckDocRef, { franchiseId: franchiseId });
  }

  getTrucksForFranchise(franchiseId: string): Observable<Truck[]> {
    const q = query(this.trucksCollection, where('franchiseId', '==', franchiseId));
    return collectionData(q, { idField: 'id' }) as Observable<Truck[]>;
  }
}
