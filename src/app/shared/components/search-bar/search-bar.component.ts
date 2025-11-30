import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <div class="search-input-container">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          class="search-input"
          [placeholder]="placeholder"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()"
        />
        <button 
          *ngIf="searchTerm" 
          class="clear-btn"
          (click)="clearSearch()"
        >
          ×
        </button>
      </div>

      <select 
        *ngIf="showFilter" 
        class="filter-select"
        [(ngModel)]="filterValue"
        (ngModelChange)="onFilterChange()"
      >
        <option value="">{{ filterLabel }}</option>
        <option *ngFor="let option of filterOptions" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }

    .search-input-container {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 15px;
      font-size: 18px;
      color: #7f8c8d;
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 12px 45px 12px 45px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .clear-btn {
      position: absolute;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      color: #95a5a6;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .clear-btn:hover {
      color: #e74c3c;
    }

    .filter-select {
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      background: white;
      min-width: 200px;
      transition: all 0.3s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    @media (max-width: 768px) {
      .search-bar {
        flex-direction: column;
      }

      .filter-select {
        min-width: auto;
        width: 100%;
      }
    }
  `]
})
export class SearchBarComponent {
  @Input() placeholder = 'Buscar...';
  @Input() showFilter = false;
  @Input() filterLabel = 'Filtrar por...';
  @Input() filterOptions: { label: string; value: string }[] = [];
  
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  searchTerm = '';
  filterValue = '';

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }

  onFilterChange() {
    this.filter.emit(this.filterValue);
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }
}
