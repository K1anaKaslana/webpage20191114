/*
 * @Author: Leniakea
 * @Date: 2022-10-26 12:52:30
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-10-26 13:05:12
 * @FilePath: \webpage\src\components\Footer\index.tsx
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="2022 大数据系统设计与实现 豆瓣大数据分析"
      links={[
        {
          key: 'My Blog',
          title: '我的博客',
          href: 'https://akasaka47.github.io/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/akasaka47',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design/index-cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
