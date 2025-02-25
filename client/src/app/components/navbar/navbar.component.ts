import { Component, computed, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutConfirmationComponent } from '../logout-confirmation/logout-confirmation.component';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  accountService = inject(AccountService);
  isAuthenticated = computed(() => !!this.accountService.currentUser());
  userName = computed(() => {
    const user = this.accountService.currentUser();
    return user ? `${user.firstName} ${user.lastName}`.trim() : '';
  });
  userImage = '';

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.removeItem('user');
        this.accountService.logout();
        this.userImage = '';
        this.router.navigate(['/']);
      }
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterOpened().subscribe(() => {
      const dialogElement = document.querySelector('.mat-dialog-container') as HTMLElement;
      if (dialogElement) {
        dialogElement.setAttribute('tabindex', '0');
        dialogElement.focus();
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userImage =
          'https://avatars.githubusercontent.com/u/105753470?s=400&u=9f86ea9574118951d65114b3dc424f9978d83c59&v=4';
        this.accountService.currentUser.set(result);
      }
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
