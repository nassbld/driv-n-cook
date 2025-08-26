import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "driv-n-cook", appId: "1:413852152288:web:8a5abec288984407753b85", storageBucket: "driv-n-cook.firebasestorage.app", apiKey: "AIzaSyBvbNjy4CG-l8zS7xMWZxAFba0ujer3hK8", authDomain: "driv-n-cook.firebaseapp.com", messagingSenderId: "413852152288", measurementId: "G-QVXLZQ7FEC" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
