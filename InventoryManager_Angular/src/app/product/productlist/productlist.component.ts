import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  
  // Sorting
  sortColumn: string = 'name';
  sortDirection: string = 'asc';
  
  // Filter
  filterText: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.applyFilters();
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  applyFilters(): void {
    // First apply text filter
    if (this.filterText.trim()) {
      const searchTerm = this.filterText.toLowerCase().trim();
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) || 
        product.brandName.toLowerCase().includes(searchTerm) || 
        product.productTypeName.toLowerCase().includes(searchTerm) || 
        product.price.toString().includes(searchTerm)
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    
    // Then apply sorting
    this.sortProducts();
    
    // Update total for pagination
    this.totalItems = this.filteredProducts.length;
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      let aValue: any = a[this.sortColumn as keyof Product];
      let bValue: any = b[this.sortColumn as keyof Product];
      
      // Handle string vs number comparisons
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      // Toggle direction if same column
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.sortProducts();
  }

  onFilterChange(): void {
    this.currentPage = 1;  // Reset to first page on filter change
    this.applyFilters();
  }

  onItemsPerPageChange(value: number): void {
    this.itemsPerPage = value;
    this.currentPage = 1;  // Reset to first page
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Helper method for price formatting
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(price);
  }
}
