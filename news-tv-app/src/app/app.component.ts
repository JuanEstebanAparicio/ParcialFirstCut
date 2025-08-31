import { Component } from '@angular/core';
import { StorageService } from './providers/storage';
import { EncryptService } from './providers/encrypt';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private storage: StorageService,
    private encrypt: EncryptService,
    private userService: UserService,
  ) {}
ngOnInit() {
 // Registro
  try {
    const u = this.userService.register({
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com',
      passwordRaw: '1234567890',
      country: { id: 'Colombia', value: '🇨🇴 Colombia' }
    });
    console.log('Usuario registrado:', u);
  } catch (e: any) {
    console.warn(e.message);
  }

  // Login
  try {
    const logged = this.userService.login('jane@doe.com', '1234567890');
    console.log('Usuario autenticado:', logged);
  } catch (e: any) {
    console.error(e.message);
  }

  // Usuario actual
  console.log('Current user:', this.userService.getCurrentUser());

  }

  }

