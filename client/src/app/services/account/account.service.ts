import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginDto, RegisterDto } from '../../dtos/account.dto';
import { User } from '../../models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:8083/api/';
  currentUser = signal<User | null>(null);

  login(dto: LoginDto) {
    return this.http.post<User>(this.baseUrl + 'account/login', dto).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
        return null;
      })
    );
  }

  register(dto: RegisterDto) {
    return this.http.post<User>(this.baseUrl + 'account/register', dto).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
        return null;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
