import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  collectionData,
  doc, updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MaintenanceLog} from '../models/maintenance-log.model';
import {Truck} from '../models/truck.model';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  private firestore: Firestore = inject(Firestore);

  async reportIssue(truck: Truck, description: string): Promise<void> {
    const logsCollection = collection(this.firestore, 'maintenance_logs');
    await addDoc(logsCollection, {
      truckId: truck.id,
      truckLicensePlate: truck.licensePlate,
      reportedDate: serverTimestamp(),
      description: description,
      status: 'signalée'
    });
  }

  getLogsForTruck(truckId: string): Observable<MaintenanceLog[]> {
    const logsCollection = collection(this.firestore, 'maintenance_logs');
    const q = query(
      logsCollection,
      where('truckId', '==', truckId),
      orderBy('reportedDate', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<MaintenanceLog[]>;
  }

  getAllLogs(): Observable<MaintenanceLog[]> {
    const logsCollection = collection(this.firestore, 'maintenance_logs');
    const q = query(logsCollection, orderBy('reportedDate', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<MaintenanceLog[]>;
  }

  async updateLogStatus(logId: string, newStatus: 'signalée' | 'en_cours' | 'résolue'): Promise<void> {
    const logRef = doc(this.firestore, `maintenance_logs/${logId}`);
    await updateDoc(logRef, { status: newStatus });
  }
}
