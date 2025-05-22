import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { ProductService, Product } from '../../services/product.service';
import { registerables } from 'chart.js';

// Register necessary Chart.js components
import { ArcElement, PieController, Legend, Tooltip } from 'chart.js';
Chart.register(ArcElement, PieController, Legend, Tooltip);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements  AfterViewInit {
  productsByBrand: any[] = [];
  productsByType: any[] = [];
  topExpensiveProducts: Product[] = [];
  

  brandChartInstance!: Chart;
  productTypeChartInstance!: Chart;

  constructor(
    private productService: ProductService, 
    private http: HttpClient,  
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.fetchData();
    this.loadTopExpensiveProducts();
  }

  fetchData() {
    this.productService.getProductsByBrand().subscribe(data => {
      console.log('Products by Brands:', data);
      this.productsByBrand = data;
      this.createBrandChart();
    });
  
    this.productService.getProductsByType().subscribe(data => {
      console.log('Products by Types:', data);
      this.productsByType = data;
      this.createProductTypeChart();
    });
  }

 
  
  createBrandChart() {
    const brandCtx = document.getElementById('brandChart') as HTMLCanvasElement;
    new Chart(brandCtx, {
      type: 'pie',
      data: {
        labels: this.productsByBrand.map(item => item.brand), 
        datasets: [{
          label: 'Products by Brand',
          data: this.productsByBrand.map(item => item.count),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true, // You can make it false to remove the responsiveness of the chart
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true, 
            text: 'Product Count by Brand'
          }
        }
      }
    });
  }
  
  createProductTypeChart() {
    const productTypeCtx = document.getElementById('productTypeChart') as HTMLCanvasElement;
    new Chart(productTypeCtx, {
      type: 'pie',
      data: {
        labels: this.productsByType.map(item => item.productType), 
        datasets: [{
          label: 'Products by Type',
          data: this.productsByType.map(item => item.count),
          backgroundColor: [
            '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E', '#FF6384'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,  // You can make it false to remove the responsiveness of the chart
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,  
            text: 'Product Count by Type'
          }
        }
      }
    });
  }
  
  // Helper method to generate random colors
  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137) % 360; // Golden angle approximation for better distribution
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  }
  
  // Helper method to adjust color brightness
  adjustBrightness(color: string, amount: number): string {
    if (color.startsWith('hsl')) {
      const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        const h = parseInt(match[1], 10);
        const s = parseInt(match[2], 10);
        const l = Math.max(0, Math.min(100, parseInt(match[3], 10) + amount));
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
    }
    return color;
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

  loadTopExpensiveProducts(): void {
    this.productService.getTopExpensiveProducts().subscribe(
      products => {
        this.topExpensiveProducts = products;
      },
      error => console.error('Error loading top expensive products:', error)
    );
  }
}