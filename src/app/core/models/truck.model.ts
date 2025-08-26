export interface Truck {
  id: string;
  licensePlate: string;
  model: string;
  status: 'in_service' | 'maintenance' | 'out_of_service';
  franchiseId: string | null; // ID du franchisé auquel il est attribué
}
