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


  }

