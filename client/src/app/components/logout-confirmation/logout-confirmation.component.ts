import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-logout-confirmation',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './logout-confirmation.component.html',
  styleUrl: './logout-confirmation.component.scss'
})
export class LogoutConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<LogoutConfirmationComponent>) {}

  confirmLogout() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
