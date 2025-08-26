import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth';
import {TruckService} from '../../../core/services/truck';
import {Observable, of} from 'rxjs';
import {Truck} from '../../../core/models/truck.model';
import {switchMap} from 'rxjs/operators';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {OrderService} from '../../../core/services/order';
import {Order} from '../../../core/models/order.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './franchise-dashboard.html',
  styleUrl: './franchise-dashboard.css'
})
export class FranchiseDashboard {
  private authService = inject(AuthService);
  private truckService = inject(TruckService);
  private orderService = inject(OrderService);

  userProfile$ = this.authService.userProfile$;

  assignedTrucks$: Observable<Truck[]> = this.userProfile$.pipe(
    switchMap(profile => {
      if (profile && profile.uid) {
        return this.truckService.getTrucksForFranchise(profile.uid);
      }
      return of([]);
    })
  );

  recentOrders$: Observable<Order[]> = this.userProfile$.pipe(
    switchMap(profile => {
      if (profile?.uid) {
        return this.orderService.getOrdersForFranchise(profile.uid);
      }
      return of([]);
    })
  );
}
