import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }


  getObject<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) as T : null;
  }


  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }


  getString(key: string): string | null {
    return localStorage.getItem(key);
  }


  remove(key: string): void {
    localStorage.removeItem(key);
  }


  clear(): void {
    localStorage.clear();
  }
}
