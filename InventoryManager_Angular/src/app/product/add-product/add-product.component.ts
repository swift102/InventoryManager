import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ProductService, Brand, ProductType } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  brandsData: Brand[] = [];
  productTypesData: ProductType[] = [];
  fileNameUploaded = '';
  isLoading = false;
  formData = new FormData();

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required], 
    price: ['', [Validators.required, Validators.min(0.01)]],
    brand: ['', Validators.required],
    producttype: ['', Validators.required],
    description: ['', Validators.required]
  });
  showSuccessMessage: any;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Get brands
    this.productService.getBrands().subscribe({
      next: (result) => {
        this.brandsData = result;
        console.log('Brands Data:', this.brandsData);
      },
      error: (error) => {
        console.error('Error fetching brands', error);
        alert('Failed to load brands data. Please try again later.');
      }
    });

    // Get product types
    this.productService.getProductTypes().subscribe({
      next: (result) => {
        this.productTypesData = result;
        console.log('Product Types Data:', this.productTypesData);
      },
      error: (error) => {
        console.error('Error fetching product types', error);
        alert('Failed to load product types data. Please try again later.');
      }
    });
  }

  uploadFile(files: FileList | null): void {
    if (!files || files.length === 0) {
      return;
    }
    
    const fileToUpload = files[0];
    
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(fileToUpload.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (fileToUpload.size > maxSize) {
      alert('Image size should not exceed 5MB');
      return;
    }
    
    this.fileNameUploaded = fileToUpload.name;
    
    // Update the form control value
    this.productForm.patchValue({
      image: fileToUpload
    });
    
    // Mark as touched to trigger validation
    this.productForm.get('image')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isLoading = true;
    
    // Create a new FormData object
    const formData = new FormData();
    
    // Append form values
    formData.append('Name', this.productForm.get('name')!.value);
    formData.append('Price', this.productForm.get('price')!.value);
    formData.append('Description', this.productForm.get('description')!.value);
    formData.append('Brand', this.productForm.get('brand')!.value);
    formData.append('ProductType', this.productForm.get('producttype')!.value);
    
    // Append file if it exists
    const imageFile = this.productForm.get('image')!.value;
    if (imageFile instanceof File) {
      formData.append('Image', imageFile, imageFile.name);
    }
    
    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        this.clearData();
        this.router.navigateByUrl('/products').then(navigated => {
          if (navigated) {
            this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', { duration: 5000 });
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error adding product', error);
        alert('Failed to create product. Please try again.');
      }
    });
  }

  clearData() {
    this.formData.delete("Image");
    this.formData.delete("Name");
    this.formData.delete("Price");
    this.formData.delete("Description");
    this.formData.delete("Brand");
    this.formData.delete("ProductType");
  }
}