import { sm2 } from 'sm-crypto';
import { auth } from '../defaultSettings';


/**
 * sm2 加密方法
 * @param data
 * @returns {*}
 */
export default function encrypt(data) {
  try {
    return sm2.doEncrypt(data, auth.publicKey, 0);
  } catch {
    return '';
  }
}
