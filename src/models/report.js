import { REPORT_NAMESPACE } from '../actions/report';
import { list } from '../services/report';

export default {
  namespace: REPORT_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    detail: {},
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
          payload: {
            list: response.data.records,
            pagination: {
              total: response.data.total,
              current: response.data.current,
              pageSize: response.data.size,
            },
          },
        });
      }
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
