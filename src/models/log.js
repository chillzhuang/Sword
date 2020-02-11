import { LOG_NAMESPACE } from '../actions/log';
import {
  usualList,
  usualDetail,
  apiList,
  apiDetail,
  errorList,
  errorDetail,
} from '../services/log';

export default {
  namespace: LOG_NAMESPACE,
  state: {
    usualData: {
      list: [],
      pagination: {},
    },
    usualDetail: {},
    apiData: {
      list: [],
      pagination: {},
    },
    apiDetail: {},
    errorData: {
      list: [],
      pagination: {},
    },
    errorDetail: {},
  },
  effects: {
    *fetchUsualList({ payload }, { call, put }) {
      const response = yield call(usualList, payload);
      if (response.success) {
        yield put({
          type: 'saveUsualList',
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
    *fetchApiList({ payload }, { call, put }) {
      const response = yield call(apiList, payload);
      if (response.success) {
        yield put({
          type: 'saveApiList',
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
    *fetchErrorList({ payload }, { call, put }) {
      const response = yield call(errorList, payload);
      if (response.success) {
        yield put({
          type: 'saveErrorList',
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
    *fetchUsualDetail({ payload }, { call, put }) {
      const response = yield call(usualDetail, payload);
      if (response.success) {
        yield put({
          type: 'saveUsualDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *fetchApiDetail({ payload }, { call, put }) {
      const response = yield call(apiDetail, payload);
      if (response.success) {
        yield put({
          type: 'saveApiDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *fetchErrorDetail({ payload }, { call, put }) {
      const response = yield call(errorDetail, payload);
      if (response.success) {
        yield put({
          type: 'saveErrorDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
  },
  reducers: {
    saveUsualList(state, action) {
      return {
        ...state,
        usualData: action.payload,
      };
    },
    saveApiList(state, action) {
      return {
        ...state,
        apiData: action.payload,
      };
    },
    saveErrorList(state, action) {
      return {
        ...state,
        errorData: action.payload,
      };
    },
    saveUsualDetail(state, action) {
      return {
        ...state,
        usualDetail: action.payload.detail,
      };
    },
    saveApiDetail(state, action) {
      return {
        ...state,
        apiDetail: action.payload.detail,
      };
    },
    saveErrorDetail(state, action) {
      return {
        ...state,
        errorDetail: action.payload.detail,
      };
    },
  },
};
