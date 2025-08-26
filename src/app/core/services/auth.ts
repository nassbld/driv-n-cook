import {Injectable, inject, EnvironmentInjector, runInInjectionContext} from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface UserProfile {
  uid: string;
  role: 'admin' | 'franchise';
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  // Injectez l'EnvironmentInjector
  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  // Un Observable qui émet l'état de l'utilisateur (User | null) en temps réel
  public user$ = authState(this.auth);

  // Un Observable qui combine l'état de l'utilisateur et son rôle depuis Firestore
  public userProfile$: Observable<UserProfile | null> = this.user$.pipe(
    switchMap(user => {
      if (!user) {
        // Si l'utilisateur n'est pas connecté, on renvoie null
        return of(null);
      }

      // LA CORRECTION EST ICI : on utilise runInInjectionContext
      return runInInjectionContext(this.injector, () => {
        // Tout le code à l'intérieur de cette fonction s'exécute maintenant dans le bon contexte.
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return from(getDoc(userDocRef)).pipe(
          switchMap(userDoc => {
            if (userDoc.exists()) {
              const data = userDoc.data();
              return of({ uid: user.uid, role: data['role'], name: data['name'] });
            } else {
              return of(null);
            }
          })
        );
      });
    })
  );

  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.userProfile$.subscribe(profile => {
      if (profile?.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/franchise']);
      }
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
