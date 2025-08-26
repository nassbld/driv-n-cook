import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FranchiseService} from '../../../core/services/franchise';
import {AddFranchiseModal} from '../../../components/add-franchise-modal/add-franchise-modal';
import {Franchise} from '../../../core/models/franchise.model';
import {ConfirmationModalComponent} from '../../../components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AddFranchiseModal, ConfirmationModalComponent], // CommonModule pour utiliser les pipes comme 'async' et les directives comme '@if'
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard { // Notez le nom de la classe
  private franchiseService = inject(FranchiseService);

  franchises$ = this.franchiseService.getFranchises();

  // Signal pour contrôler la visibilité de la modale
  isModalOpen = signal(false);

  // Signaux pour gérer la modale de confirmation
  showConfirmationModal = signal(false);
  franchiseToDelete = signal<Franchise | null>(null);

  // Ouvre la modale de confirmation et stocke le franchisé à supprimer
  openDeleteConfirmation(franchise: Franchise): void {
    this.franchiseToDelete.set(franchise);
    this.showConfirmationModal.set(true);
  }

  // Appelé quand l'admin confirme la suppression
  async onConfirmDelete(): Promise<void> {
    const franchise = this.franchiseToDelete();
    if (franchise) {
      try {
        await this.franchiseService.deleteFranchise(franchise.id);
      } catch (error) {
        console.error("La suppression a échoué", error);
        // Ici, vous pourriez afficher une notification d'erreur à l'utilisateur
      } finally {
        this.closeConfirmationModal();
      }
    }
  }

  // Ferme la modale et réinitialise les signaux
  closeConfirmationModal(): void {
    this.showConfirmationModal.set(false);
    this.franchiseToDelete.set(null);
  }
}
