import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Guarda un objeto como JSON
  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Lee y parsea un objeto JSON
  getObject<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) as T : null;
  }

  // Guarda una cadena
  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Lee una cadena
  getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Elimina un ítem
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpia todo el storage
  clear(): void {
    localStorage.clear();
  }
}
