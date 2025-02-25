import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountService } from './services/account/account.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MaterialModule, NavbarComponent, CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  title: string = 'client';

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
}
