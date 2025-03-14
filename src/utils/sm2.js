import smCrypto from 'sm-crypto';
import { auth } from '../defaultSettings';


/**
 * sm2 加密方法
 * @param data
 * @returns {*}
 */
export default function encrypt(data) {
  try {
    return smCrypto.sm2.doEncrypt(data, auth.publicKey, 0);
  } catch {
    return '';
  }
}
