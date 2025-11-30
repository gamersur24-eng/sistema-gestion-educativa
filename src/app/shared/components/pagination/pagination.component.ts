import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button 
        class="pagination-btn"
        [disabled]="currentPage === 1"
        (click)="goToPage(1)"
      >
        ⟪
      </button>

      <button 
        class="pagination-btn"
        [disabled]="currentPage === 1"
        (click)="goToPage(currentPage - 1)"
      >
        ‹
      </button>

      <button
        *ngFor="let page of visiblePages"
        class="pagination-btn"
        [class.active]="page === currentPage"
        (click)="goToPage(page)"
      >
        {{ page }}
      </button>

      <button 
        class="pagination-btn"
        [disabled]="currentPage === totalPages"
        (click)="goToPage(currentPage + 1)"
      >
        ›
      </button>

      <button 
        class="pagination-btn"
        [disabled]="currentPage === totalPages"
        (click)="goToPage(totalPages)"
      >
        ⟫
      </button>

      <div class="pagination-info">
        Mostrando {{ startItem }}-{{ endItem }} de {{ totalItems }} elementos
      </div>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      padding: 20px 0;
      flex-wrap: wrap;
    }

    .pagination-btn {
      min-width: 40px;
      height: 40px;
      padding: 8px 12px;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
      transition: all 0.3s ease;
    }

    .pagination-btn:hover:not(:disabled) {
      border-color: #667eea;
      color: #667eea;
      background: #f8f9fa;
    }

    .pagination-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }

    .pagination-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .pagination-info {
      margin-left: auto;
      color: #7f8c8d;
      font-size: 14px;
      padding: 0 10px;
    }

    @media (max-width: 768px) {
      .pagination {
        justify-content: center;
      }

      .pagination-info {
        width: 100%;
        text-align: center;
        margin-left: 0;
        margin-top: 10px;
      }
    }
  `]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() maxVisiblePages = 5;

  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  visiblePages: number[] = [];
  startItem = 0;
  endItem = 0;

  ngOnChanges() {
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    
    // Calcular páginas visibles
    const halfVisible = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < this.maxVisiblePages) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }
    
    this.visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.calculatePagination();
      this.pageChange.emit(page);
    }
  }
}
