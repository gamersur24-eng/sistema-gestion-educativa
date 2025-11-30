import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized-page">
      <div class="unauthorized-content">
        <div class="icon">🚫</div>
        <h1>Acceso No Autorizado</h1>
        <p>Lo sentimos, no tienes permisos para acceder a esta página.</p>
        <div class="buttons">
          <button class="btn-primary" (click)="goToDashboard()">
            Ir al Dashboard
          </button>
          <button class="btn-secondary" (click)="logout()">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .unauthorized-content {
      background: white;
      padding: 60px 40px;
      border-radius: 12px;
      text-align: center;
      max-width: 500px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    .icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    h1 {
      color: #2c3e50;
      font-size: 28px;
      margin: 0 0 15px;
    }

    p {
      color: #7f8c8d;
      font-size: 16px;
      margin: 0 0 30px;
    }

    .buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .btn-secondary:hover {
      background: #7f8c8d;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
  }
}
