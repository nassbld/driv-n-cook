import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'; // Importation pour Auth
import {
  Firestore,
  collection,
  query,
  where,
  collectionData,
  doc,
  setDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore'; // Importations pour Firestore
import { Observable } from 'rxjs';
import { Franchise } from '../models/franchise.model';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth); // Assurez-vous que cette ligne est présente

  /**
   * Récupère en temps réel tous les utilisateurs qui ont le rôle 'franchise'
   */
  getFranchises(): Observable<Franchise[]> {
    const usersCollection = collection(this.firestore, 'users');
    const franchisesQuery = query(usersCollection, where('role', '==', 'franchise'));
    return collectionData(franchisesQuery, { idField: 'id' }) as Observable<Franchise[]>;
  }

  /**
   * Crée un nouvel utilisateur (Auth) et son profil (Firestore) pour un franchisé.
   */
  async createFranchise(franchiseData: { name: string; email: string; password: string }): Promise<void> {
    try {
      // Étape 1 : Créer l'utilisateur dans le service d'Authentification
      const userCredential = await createUserWithEmailAndPassword(this.auth, franchiseData.email, franchiseData.password);

      const newUser = userCredential.user;
      console.log('Utilisateur créé dans Auth avec UID:', newUser.uid);

      // Étape 2 : Créer le document correspondant dans la collection 'users' de Firestore
      const userDocRef = doc(this.firestore, `users/${newUser.uid}`);

      await setDoc(userDocRef, {
        name: franchiseData.name,
        email: franchiseData.email,
        role: 'franchise',
        startDate: new Date() // Date de création par défaut
      });

      console.log('Document utilisateur créé dans Firestore.');

    } catch (error) {
      console.error("Erreur lors de la création du franchisé:", error);
      // Renvoyer l'erreur pour que le composant puisse l'afficher à l'utilisateur
      throw error;
    }
  }

  async deleteFranchise(franchiseId: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${franchiseId}`);
      await deleteDoc(userDocRef);
      console.log('Document franchisé supprimé:', franchiseId);
    } catch (error) {
      console.error("Erreur lors de la suppression du franchisé:", error);
      throw error;
    }
  }

  getFranchiseProfile(userId: string): Observable<Franchise | null> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<Franchise | null>;
  }
}
