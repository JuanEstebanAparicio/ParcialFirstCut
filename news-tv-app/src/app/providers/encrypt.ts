import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  // Genera hash SHA256 de un string
  encrypt(value: string): string {
    return CryptoJS.SHA256(value).toString();
  }
  // Compara texto plano vs. hash
  compare(raw: string, hashed: string): boolean {
    return this.encrypt(raw) === hashed;
  }

  private readonly SECRET_KEY = 'PIZZA_DE_POLLO_CON_CHAMPIÑONES';

  encryptAES(plain: string): string {
    return CryptoJS.AES.encrypt(plain, this.SECRET_KEY).toString();
  }

}

