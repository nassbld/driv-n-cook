import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FranchiseService} from '../../core/services/franchise';

@Component({
  selector: 'app-add-franchise-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-franchise-modal.html',
  styleUrls: ['./add-franchise-modal.css']
})
export class AddFranchiseModal {
  @Output() close = new EventEmitter<void>();

  private franchiseService = inject(FranchiseService);

  // Signaux pour les champs du formulaire
  name = signal('');
  email = signal('');
  password = signal('');

  // Signaux pour gérer l'état de la soumission
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  async onSubmit() {
    if (!this.name() || !this.email() || !this.password()) {
      this.errorMessage.set('Tous les champs sont requis.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.franchiseService.createFranchise({
        name: this.name(),
        email: this.email(),
        password: this.password()
      });
      // Si la création réussit, on ferme la modale
      this.close.emit();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage.set('Cette adresse e-mail est déjà utilisée.');
      } else {
        this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
      }
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
