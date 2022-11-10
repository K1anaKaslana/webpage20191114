/*
 * @Author: Leniakea
 * @Date: 2022-10-28 16:52:34
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-11-07 10:30:11
 * @FilePath: \webpage\src\models\MovieDetail.ts
 */
import { Effect, Reducer, request, Subscription, useModel } from 'umi';

export interface MovieDetailModelState {
  data: API.MovieDetail;
}

// state: 初始数据
// effects: 获取数据
// reducers: 修改数据
// subscription: 订阅数据，每次刷新页面会订阅，此动作为全局的，前往任一页面都会触发订阅

export interface MovieDetailModelType {
  namespace: 'MovieDetail';
  state: MovieDetailModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<MovieDetailModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const MovieDetailModel: MovieDetailModelType = {
  namespace: 'MovieDetail',
  state: {
    data: {
      info: {
        id: '0',
        title_cn: '电影',
        title_en: 'movie',
        tags: ['好康的'],
        score: '10',
        eva_num: '1',
        picture: '',
        content: '好康的',
      },
      eva_people_num: '1', // 评分总人数
      stars_num: {
        // 评分人数占比
        s5: '1',
        s4: '1',
        s3: '1',
        s2: '1',
        s1: '1',
      },
      eva_short_num: '1', // 短评数
      director: '我', // 导演
      screenwriter: [], // 编剧
      lead_actor: [], // 主演
      region: [], // 制片国家或地区
      language: [], // 语言
      release_date: [], // 上映日期
      film_length: '1', // 片长（分钟）
      douban_site: 'abc', // 豆瓣网址
      official_site: '123', // 官方网址
      IMDb_site: '456', // IMDb网址
      total_score: '1', // 总分: 评分x评价人数
    },
  },
  effects: {
    *query({ payload }, { call, put }) {},
    // put, call, select一定要输入全，不然fetch无法执行
    *fetch({ type, payload }, { put, call, select }) {
      const token = localStorage.getItem('token');
      const movie_id = localStorage.getItem('movie_id');
      const { data: res } = yield request<API.MovieDetail>('/movie/detail', {
        headers: { Authorization: 'Bearer ' + String(token) },
        params: { movie_id: movie_id },
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
        if (pathname === '/movie/detail') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default MovieDetailModel;
