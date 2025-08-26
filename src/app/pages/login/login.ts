import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);

  email = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);

  async login() {
    this.errorMessage.set(null);
    try {
      await this.authService.login(this.email(), this.password());
      // La redirection est gérée par le service
    } catch (error: any) {
      console.error(error);
      this.errorMessage.set("L'email ou le mot de passe est incorrect.");
    }
  }
}
