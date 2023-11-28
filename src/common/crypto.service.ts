import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  //Test api values
  private algorithm: string = 'aes-256-cbc';
  private secretKey: string = '12345678901234567890123456789012';
  private iv: string = '1234567890123456';

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      Buffer.from(this.iv),
    );

    const encrypted = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]).toString('hex');

    return encrypted;
  }

  decrypt(text: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      this.iv,
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(text, 'hex')),
      decipher.final(),
    ]).toString();

    return decrpyted;
  }
}
