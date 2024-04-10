import crypto from "crypto";

const secret = process.env.CRYPTO_SECRET!;
const iv = process.env.CRYPTO_IV!;
const algorithm = "aes-256-cbc";

export const encrypt = (raw: string) => {
  let cipher = crypto.createCipheriv(algorithm, secret, iv);
  let encrypted = cipher.update(raw, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const decrypt = (hex: string) => {
  let decipher = crypto.createDecipheriv(algorithm, secret, iv);
  let decrypted = decipher.update(hex, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};
