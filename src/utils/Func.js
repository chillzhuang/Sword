import moment from 'moment';
import RequestForm from '@/utils/RequestForm';

/**
 * 通用工具类
 */
export default class Func {
  /**
   * 不为空
   * @param val
   * @returns {boolean}
   */
  static notEmpty(val) {
    return !this.isEmpty(val);
  }

  /**
   * 为空
   * @param val
   * @returns {boolean}
   */
  static isEmpty(val) {
    if (
      val === null ||
      typeof val === 'undefined' ||
      (typeof val === 'string' && val === '' && val !== 'undefined')
    ) {
      return true;
    }
    return false;
  }

  /**
   * 强转int型
   * @param val
   * @param defaultValue
   * @returns {number}
   */
  static toInt(val, defaultValue) {
    if (this.isEmpty(val)) {
      return defaultValue === undefined ? -1 : defaultValue;
    }
    const num = parseInt(val, 0);
    return Number.isNaN(num) ? (defaultValue === undefined ? -1 : defaultValue) : num;
  }

  /**
   * Json强转为Form类型
   * @param obj
   * @returns {RequestForm}
   */
  static toFormData(obj) {
    return new RequestForm(obj);
  }

  /**
   * 字符串转为date类
   * @param date
   * @param format
   * @returns {any}
   */
  static moment(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? moment(date, format) : null;
  }

  /**
   * date类转为字符串格式
   * @param date
   * @param format
   * @returns {null}
   */
  static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? date.format(format) : null;
  }

  /**
   * 根据逗号联合
   * @param arr
   * @returns {string}
   */
  static join(arr) {
    return arr ? arr.join(',') : '';
  }

  /**
   * 根据逗号分隔
   * @param str
   * @returns {string}
   */
  static split(str) {
    return str ? String(str).split(',') : '';
  }
}
