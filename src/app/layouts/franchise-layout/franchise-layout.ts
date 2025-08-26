import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from '../../core/services/auth';

@Component({
  selector: 'app-franchise-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './franchise-layout.html',
  styleUrls: ['./franchise-layout.css']
})
export class FranchiseLayout {
  private authService = inject(AuthService);
  logout() { this.authService.logout(); }
}
