import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { LoginCredentials } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
  ) {}

  login(credentials: LoginCredentials) {
    return timer(1000);
  }
}
