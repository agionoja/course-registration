import crypto from "node:crypto";
import { promisify } from "node:util";

export function hash(plainText: string, salt?: number) {
  return new Promise((resolve, reject) => {
    promisify(crypto.randomBytes)(salt ? salt : 16)
      .then((saltBuffer) => {
        const salt = saltBuffer.toString("hex");

        crypto.scrypt(plainText, salt, 64, (err, derivedKey) => {
          if (err) return reject(err);

          const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;
          return resolve(hashedPassword);
        });
      })
      .catch(reject);
  });
}

export function compare(plainText?: string, hash?: string) {
  return new Promise((resolve, reject) => {
    if (!plainText || !hash) return resolve(false);
    const [salt, key] = hash.split(":");

    crypto.scrypt(plainText, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      return resolve(derivedKey.toString("hex") === key);
    });
  });
}

export const scrypt = { hash, compare };
