import { Injectable } from '@angular/core';
import { Client } from 'dsteem';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private client: Client;
  private user: any;

  constructor() {
    this.client = new Client('https://api.hive.blog');
  }

  login(username: string) {
    return new Promise((resolve, reject) => {
      const keychain = (window as any).hive_keychain;
      if (!keychain) {
        return reject('Hive Keychain no está instalado.');
      }

      keychain.requestHandshake(() => {
        keychain.requestSignBuffer(username, 'login', 'Posting', (response: any) => {
          if (response.success) {
            this.user = username;
            resolve(this.user);
          } else {
            reject(response.message);
          }
        });
      });
    });
  }

  getUser() {
    return this.user;
  }
}
