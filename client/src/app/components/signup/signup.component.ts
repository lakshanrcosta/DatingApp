import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { RegisterDto } from '../../dtos/account.dto';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private accountService = inject(AccountService);
  signupForm: FormGroup;
  showPassword = false;
  passwordStrength = '';
  passwordStrengthLabel = '';
  usernameTaken = false;
  passwordStrengthValue = 0;
  passwordStrengthColor = '';
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkStrength() {
    const password = this.signupForm.get('password')?.value || '';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);
    const hasMinLength6 = password.length >= 6;
    const hasMinLength10 = password.length >= 10;

    if (!password) {
      this.passwordStrength = '';
      this.passwordStrengthLabel = '';
      this.passwordStrengthValue = 0;
      this.passwordStrengthColor = 'primary';
      return;
    }

    if (!hasMinLength6) {
      this.passwordStrength = 'weak';
      this.passwordStrengthLabel = 'Weak (Too short)';
      this.passwordStrengthValue = 20;
      this.passwordStrengthColor = 'warn';
    } else if (hasMinLength10 && hasUpperCase && hasSpecialChar) {
      this.passwordStrength = 'strong';
      this.passwordStrengthLabel = 'Strong 💪';
      this.passwordStrengthValue = 100;
      this.passwordStrengthColor = 'success';
    } else {
      this.passwordStrength = 'medium';
      this.passwordStrengthLabel = 'Medium (Add uppercase & special char)';
      this.passwordStrengthValue = 50;
      this.passwordStrengthColor = 'amber';
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value || '';

    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);

    const errors: ValidationErrors = {};

    if (!hasUpperCase) {
      errors['noUpperCase'] = true;
    }
    if (!hasSpecialChar) {
      errors['noSpecialChar'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      console.log('Submitting:', this.signupForm.value);

      const dto: RegisterDto = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName
      };

      this.accountService.register(dto).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
          console.error('Registration Error:', error);

          if (error.status === 400 && error.error === 'Username is taken') {
            this.signupForm.get('username')?.setErrors({ customError: true });
          }
        }
      });
      this.isLoading = false;
    }
  }
}
