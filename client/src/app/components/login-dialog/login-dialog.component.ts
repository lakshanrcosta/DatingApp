import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';
import { LoginDto } from '../../dtos/account.dto';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  private accountService = inject(AccountService);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  close() {
    this.dialogRef.close();
  }

  login() {
    if (this.loginForm.valid) {
      const loginDto: LoginDto = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.accountService.login(loginDto).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  signup() {
    console.log('Redirect to Sign Up Page');
  }

  forgotPassword() {
    console.log('Redirect to Forgot Password Page');
  }
}
