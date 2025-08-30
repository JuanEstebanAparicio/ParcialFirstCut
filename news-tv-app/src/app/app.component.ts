import { Component } from '@angular/core';
import { StorageService } from './providers/storage';
import { EncryptService } from './providers/encrypt';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private storage: StorageService,
    private encrypt: EncryptService
  ) {}
ngOnInit() {
    // 1. Prueba de StorageService
    const testObj = { foo: 'bar' };
    this.storage.setObject('testObj', testObj);
    console.log('StorageService.getObject("testObj"):', this.storage.getObject<typeof testObj>('testObj'));

    this.storage.setString('greeting', '¡Hola Ionic!');
    console.log('StorageService.getString("greeting"):', this.storage.getString('greeting'));

    // 2. Prueba de EncryptService
    const raw = 'miContraseña123';
    const hashed = this.encrypt.encrypt(raw);
    console.log('EncryptService.encrypt(raw):', hashed);
    console.log('EncryptService.compare(raw, hashed):', this.encrypt.compare(raw, hashed));
  }

  }

