import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MaterialModule, NavbarComponent, CommonModule]
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly accountService = inject(AccountService);
  title: string = 'client';
  users: any[] = [];

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  getUsers() {
    this.http.get('https://localhost:8083/api/users').subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
      complete: () => console.log('Users request has completed')
    });
  }
}
