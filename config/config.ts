/*
 * @Author: Leniakea
 * @Date: 2022-10-26 12:41:02
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-10-28 16:05:52
 * @FilePath: \webpage\config\config.ts
 */
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  dva: {},
  // layout: {
  //   name: '电影数据分析',
  //   locale: false,
  //   layout: 'side',
  //   contentWidth: 'Fluid',
  //   logo: './movie.png',
  //   avatarProps: {
  //     src: "https://joeschmoe.io/api/v1/random",
  //   },
  // },
  layout: {
    name: '电影推荐',
    navTheme: 'light',
    primaryColor: '#1890ff',
    layout: 'top',
    contentWidth: 'Fixed',
    fixedHeader: true,
    fixSiderbar: true,
    pwa: false,
    headerHeight: 48,
    splitMenus: false,
    logo: './movie.png',
  },
  mfsu: {},
  fastRefresh: {},
  routes: routes,
  history: { type: 'hash' },
});
