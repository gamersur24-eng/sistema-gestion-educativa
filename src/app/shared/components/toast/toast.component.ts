import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast" 
        [ngClass]="'toast-' + toast.type"
        [@slideIn]
      >
        <div class="toast-icon">
          <span *ngIf="toast.type === 'success'">✓</span>
          <span *ngIf="toast.type === 'error'">✕</span>
          <span *ngIf="toast.type === 'warning'">⚠</span>
          <span *ngIf="toast.type === 'info'">ℹ</span>
        </div>
        <div class="toast-message">{{ toast.message }}</div>
        <button class="toast-close" (click)="close(toast.id)">×</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      max-width: 500px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      border-left: 4px solid #2ecc71;
    }

    .toast-error {
      border-left: 4px solid #e74c3c;
    }

    .toast-warning {
      border-left: 4px solid #f39c12;
    }

    .toast-info {
      border-left: 4px solid #3498db;
    }

    .toast-icon {
      font-size: 24px;
      font-weight: bold;
    }

    .toast-success .toast-icon {
      color: #2ecc71;
    }

    .toast-error .toast-icon {
      color: #e74c3c;
    }

    .toast-warning .toast-icon {
      color: #f39c12;
    }

    .toast-info .toast-icon {
      color: #3498db;
    }

    .toast-message {
      flex: 1;
      color: #2c3e50;
      font-size: 14px;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 24px;
      color: #95a5a6;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .toast-close:hover {
      color: #2c3e50;
    }

    @media (max-width: 768px) {
      .toast-container {
        left: 10px;
        right: 10px;
        top: 10px;
      }

      .toast {
        min-width: auto;
        width: 100%;
      }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  close(id: number) {
    this.toastService.remove(id);
  }
}
