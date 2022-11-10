/*
 * @Author: Leniakea
 * @Date: 2022-10-26 13:04:29
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-10-31 15:24:17
 * @FilePath: \webpage\src\services\api.ts
 */
import { request } from 'umi';

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  const token = localStorage.getItem('token');
  return request<{
    data: API.CurrentUser;
  }>('/user/currentUser', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + String(token),
    },
    ...(options || {}),
  });
}

/** 登录 POST /api/user/login */
export async function login(options?: { [key: string]: any }) {
  return request<{
    data: API.LoginData;
  }>('/user/login', {
    method: 'POST',
    headers: {
      Accept: 'multipart/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...options,
  });
}

/** 注册 POST /api/user/register */
export async function register(options?: { [key: string]: any }) {
  return request<{
    data: API.LoginData;
  }>('/user/register', {
    method: 'POST',
    headers: {
      Accept: 'multipart/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...(options || {}),
  });
}
