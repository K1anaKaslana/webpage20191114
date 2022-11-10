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
