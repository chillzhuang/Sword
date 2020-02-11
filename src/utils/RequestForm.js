import { stringify } from 'qs';

export default class RequestForm {
  constructor(params) {
    const values = params;
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        values[key] = params[key].join(',');
      }
    });
    this.params = values;
  }

  parse() {
    return stringify(this.params);
  }
}
