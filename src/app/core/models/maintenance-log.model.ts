export interface MaintenanceLog {
  id: string;
  truckId: string;
  truckLicensePlate: string; // Dénormalisé pour affichage facile côté admin
  reportedDate: any; // Firestore Timestamp
  description: string;
  status: 'signalée' | 'en_cours' | 'résolue';
}
