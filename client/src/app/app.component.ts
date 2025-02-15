import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatListModule, MatIconModule]
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  title: string = 'client';
  users: any[] = [];

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.http.get<any[]>('https://localhost:8083/api/users').subscribe({
      next: (response) => {
        console.log('Users fetched successfully:', response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => console.log('User data request completed')
    });
  }
}
