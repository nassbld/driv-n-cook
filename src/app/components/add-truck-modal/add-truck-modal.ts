import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TruckService} from '../../core/services/truck';

@Component({
  selector: 'app-add-truck-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-truck-modal.html',
  styleUrls: ['./add-truck-modal.css']
})
export class AddTruckModal { // Nom de classe sans "Component"
  @Output() close = new EventEmitter<void>();

  private truckService = inject(TruckService);

  // Signaux pour le formulaire
  licensePlate = signal('');
  model = signal('');

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  async onSubmit() {
    if (!this.licensePlate() || !this.model()) {
      this.errorMessage.set('Tous les champs sont requis.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.truckService.addTruck({
        licensePlate: this.licensePlate(),
        model: this.model()
      });
      this.close.emit(); // Fermer la modale si succès
    } catch (error) {
      this.errorMessage.set('Une erreur est survenue lors de la création.');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
