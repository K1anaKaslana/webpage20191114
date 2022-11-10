/*
 * @Author: Leniakea
 * @Date: 2022-10-26 12:41:07
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-11-03 09:08:35
 * @FilePath: \webpage\config\routes.ts
 */
export default [
  {
    path: '/',
    redirect: '/dailyReco',
  },
  {
    path: '/login',
    exact: true,
    layout: false,
    component: '@/pages/login/index',
  },
  {
    name: '每日推荐',
    path: '/movie/dailyReco',
    exact: true,
    component: '@/pages/dailyReco/index',
  },
  {
    name: '全部电影',
    path: '/movie/all',
    exact: true,
    component: '@/pages/movieAll/index',
  },
  {
    path: '/movie/detail',
    exact: true,
    component: '@/pages/movieDetail/index',
  },
  {
    name: '个人信息',
    path: '/user/info',
    exact: true,
    component: '@/pages/userInfo/index',
  },
];
