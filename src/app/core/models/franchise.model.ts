export interface Franchise {
  id: string; // L'UID de Firebase
  role: 'franchise';
  // Ajoutez ici les autres champs que vous stockerez
  name: string;
  email: string;
  startDate: any; // On utilise 'any' pour l'instant, on peut le typer plus tard
}
