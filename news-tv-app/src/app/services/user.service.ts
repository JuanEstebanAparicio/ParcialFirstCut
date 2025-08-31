import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../providers/storage';
import { EncryptService } from '../providers/encrypt';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'app_users';
  private readonly CURRENT_USER = 'current_user';

  constructor(
    private storage: StorageService,
    private encrypt: EncryptService
  ) {}

  // Lee todos los usuarios registrados
  private getAllUsers(): User[] {
    return this.storage.getObject<User[]>(this.STORAGE_KEY) || [];
  }

  // Guarda la lista completa de usuarios
  private saveAllUsers(users: User[]): void {
    this.storage.setObject(this.STORAGE_KEY, users);
  }

  // Registra un nuevo usuario
  register(userData: Omit<User, 'id' | 'password'> & { passwordRaw: string }): User {
    const users = this.getAllUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('El correo ya existe');
    }

    const newUser: User = {
      id: uuidv4(),
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: this.encrypt.encrypt(userData.passwordRaw),
      country: userData.country
    };

    users.push(newUser);
    this.saveAllUsers(users);
    return newUser;
  }

  // Autentica un usuario
  login(email: string, passwordRaw: string): User {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);
    if (!user || !this.encrypt.compare(passwordRaw, user.password)) {
      throw new Error('Credenciales inválidas');
    }

    // Guarda el usuario actual en localStorage
    this.storage.setObject(this.CURRENT_USER, user);
    return user;
  }

  // Desloguea al usuario
  logout(): void {
    this.storage.remove(this.CURRENT_USER);
  }

  // Obtiene el usuario activo (o null)
  getCurrentUser(): User | null {
    return this.storage.getObject<User>(this.CURRENT_USER);
  }
}
