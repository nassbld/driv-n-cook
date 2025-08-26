import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login';
import {authGuard} from './core/guards/auth-guard';
import {adminGuard} from './core/guards/admin-guard';
import {AdminDashboard} from './pages/admin/admin-dashboard/admin-dashboard';
import {FranchiseDashboard} from './pages/franchise/franchise-dashboard/franchise-dashboard';
import {TruckManagement} from './pages/admin/truck-management/truck-management';
import {AdminLayout} from './layouts/admin-layout/admin-layout';
import {FranchiseLayout} from './layouts/franchise-layout/franchise-layout';
import {Order} from './pages/franchise/order/order';
import {OrderManagement} from './pages/admin/order-management/order-management';
import {WarehouseManagement} from './pages/admin/warehouse-management/warehouse-management';
import {TruckDetails} from './pages/franchise/truck-details/truck-details';
import {MaintenanceManagement} from './pages/admin/maintenance-management/maintenance-management';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Routes pour les administrateurs
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'trucks', component: TruckManagement },
      { path: 'orders', component: OrderManagement },
      { path: 'warehouses', component: WarehouseManagement },
      { path: 'maintenance', component: MaintenanceManagement },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Routes pour les franchisés
  {
    path: 'franchise',
    component: FranchiseLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: FranchiseDashboard },
      { path: 'order', component: Order },
      { path: 'truck-details', component: TruckDetails },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Redirection par défaut
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirection pour les routes inconnues
];
