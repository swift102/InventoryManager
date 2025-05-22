import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // If user is already logged in, redirect to product listing
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      
      this.authService.register(email, password).subscribe(
        response => {
          this.notificationService.showSuccess('Registered successfully.');
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.showError('Registration failed.');
          console.error('Registration error:', error);
        }
      );
    } else {
      // Mark fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}