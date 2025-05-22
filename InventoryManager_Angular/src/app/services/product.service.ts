import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';





export interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brandId: number;
  productTypeId: number;
  productTypeName: string;
  brandName: string;
}

export interface Brand {
  brandId: number;
  name: string;
}

export interface ProductType {
  productTypeId: number;
  name: string;
}

export interface ProductBrandGroup {
  brand: string;
  count: number;
}

export interface ProductTypeGroup {
  productType: string;
  count: number;
}

export interface AddProductModel {
  name: string;
  description: string;
  price: number;
  image: File;
  brand: number;
  productType: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5240/api'; 

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Store/ProductListing`);
  }
// Get all brands
getBrands(): Observable<Brand[]> {
  return this.http.get<Brand[]>(`${this.apiUrl}/Store/GetBrands`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get all product types
getProductTypes(): Observable<ProductType[]> {
  return this.http.get<ProductType[]>(`${this.apiUrl}/Store/GetProductTypes`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Add a new product
addProduct(product: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Store/addProducts`, product)
    .pipe(
      catchError(this.handleError)
    );
}


  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Store/${id}`);
  }

  // http://localhost:5240/api/Report/products-by-brands

  // Get products grouped by brand for dashboard
  getProductsByBrand(): Observable<ProductBrandGroup[]> {
    return this.http.get<ProductBrandGroup[]>(`${this.apiUrl}/Report/products-by-brands`);
  }

  
  // Get products grouped by type for dashboard
  getProductsByType(): Observable<ProductTypeGroup[]> {
    return this.http.get<ProductTypeGroup[]>(`${this.apiUrl}/Report/products-by-types`);
  }

  getProductsByBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Report/products-by-brands`);
  }

  getProductsByTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Report/products-by-types`);
  }


  // Get top 10 most expensive products
  getTopExpensiveProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Report/top-10-expensive`);
  }

 // Error handling
 private handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    
    // Try to extract more specific error message from server response
    if (error.error && typeof error.error === 'object') {
      if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.errors) {
        // Handle validation errors
        const validationErrors = error.error.errors;
        const errorMessages = Object.keys(validationErrors)
          .map(key => validationErrors[key].join(', '));
        errorMessage = errorMessages.join('; ');
      }
    }
  }
  
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}

}