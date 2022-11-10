/*
 * @Author: Leniakea
 * @Date: 2022-11-07 13:33:50
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-11-08 15:09:58
 * @FilePath: \webpage\src\models\UserInfo.ts
 */
import { Effect, Reducer, request, Subscription, useModel } from 'umi';

export interface UserInfoModelState {
  data: API.UserInfo;
}

// state: 初始数据
// effects: 获取数据
// reducers: 修改数据
// subscription: 订阅数据，每次刷新页面会订阅，此动作为全局的，前往任一页面都会触发订阅

export interface UserInfoModelType {
  namespace: 'UserInfo';
  state: UserInfoModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<UserInfoModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserInfoModel: UserInfoModelType = {
  namespace: 'UserInfo',
  state: {
    data: {
      id: '0',
      name: 'jiege',
    },
  },
  effects: {
    *query({ payload }, { call, put }) {},
    // put, call, select一定要输入全，不然fetch无法执行
    *fetch({ type, payload }, { put, call, select }) {
      const token = localStorage.getItem('token');
      const { data: res } = yield request<API.UserInfo>('/user/info', {
        headers: { Authorization: 'Bearer ' + String(token) },
      });
      const localData = {
        data: res,
      };
      yield put({
        type: 'save',
        payload: localData,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 这里是vscode把query标红，但query是可以获取到请求参数的，可以不管
      return history.listen(({ pathname }) => {
        if (pathname === '/user/tags') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default UserInfoModel;
