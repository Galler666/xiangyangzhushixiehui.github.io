import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';

export const encryptPath = (path: string): string => {
  const timestamp = Date.now();
  const data = `${path}|${timestamp}`;
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptPath = (encrypted: string): string | null => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const [path, timestamp] = decrypted.split('|');
    
    // 链接有效期为5分钟
    if (Date.now() - Number(timestamp) > 5 * 60 * 1000) {
      return null;
    }
    
    return path;
  } catch {
    return null;
  }
}; 