import { Injectable, signal } from '@angular/core';
import * as CryptoJS from 'crypto-js';
/**
 * // Necesitarás instalar crypto-js, 
 * npm install crypto-js 
 * npm install @types/crypto-js --save-dev

 */
interface DynamicData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class LordStorageService {
  private dataSignal = signal<DynamicData>({});
  public data = this.dataSignal.asReadonly();
  private Ключ = 'ЛОРД';

  constructor() {}

  setItem(key: string, value: any): void {
    this.dataSignal.update(current => ({ ...current, [key]: value }));
  }

  getItem(key: string): any {
    return this.dataSignal()[key];
  }

  removeItem(key: string): void {
    this.dataSignal.update(current => {
      const newData = { ...current };
      delete newData[key];
      return newData;
    });
  }

  getAllData(): DynamicData {
    return this.dataSignal();
  }

  clearAll(): void {
    this.dataSignal.set({});
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.Ключ).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.Ключ);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  setItemEncrypt(key: string, value: any): void {
    const encryptedValue = this.encrypt(JSON.stringify(value));
    sessionStorage.setItem(key, encryptedValue);
    this.dataSignal.update(current => ({ ...current, [key]: value }));
  }

  getItemEncrypt(key: string): any {
    const encryptedValue = sessionStorage.getItem(key);
    if (encryptedValue) {
      return JSON.parse(this.decrypt(encryptedValue));
    }
    return null;
  }

  removeItemEncrypt(key: string): void {
    // Eliminar de sessionStorage
    sessionStorage.removeItem(key);

    // Eliminar de la señal
    this.dataSignal.update(current => {
      const newData = { ...current };
      delete newData[key];
      return newData;
    });
  }
}
