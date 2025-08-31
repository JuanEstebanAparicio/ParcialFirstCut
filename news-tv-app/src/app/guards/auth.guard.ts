import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../providers/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(): boolean {
    const user = this.storage.getObject('current_user');
    if (user) return true;

    this.router.navigate(['/login']);
    return false;
  }
}