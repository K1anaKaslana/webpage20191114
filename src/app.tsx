import { ResponseError, RequestOptionsInit } from 'umi-request';
import Footer from '@/components/Footer';
import React from 'react';
import { history, RequestConfig, useModel, RunTimeLayoutConfig } from 'umi';
import { message, notification } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser } from './services/api';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const loginPath = '/login';

export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    footerRender: () => <Footer />,
    logout: () => {
      initialState.setInitialState({
        data: {},
        success: false,
      });
      localStorage.clear();
      message.success('退出成功');
      history.push('/login');
    },
    onPageChange: () => {
      const { location } = history;
      var logined = localStorage.getItem('login');
      // 如果没有登录，重定向到 login
      if (logined !== 'yes' && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    onMenuHeaderClick: () => {
      history.push('/movie/dailyReco');
    },
  };
};

export async function getInitialState(): Promise<API.CurrentUser> {
  return await queryCurrentUser();
}

// 在这里集中处理错误
const errorHandler = (error: ResponseError) => {
  notification.error({
    description: '网络异常，无法连接至服务器',
    message: '网络异常',
  });
};

// 请求前拦截器
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  return {
    url: `${url}`,
    options: { ...options, interceptors: true },
  };
};

export const request: RequestConfig = {
  prefix: '/api',
};
