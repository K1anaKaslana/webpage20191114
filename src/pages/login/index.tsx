import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { request, history, useModel } from 'umi';
import { login, register } from '@/services/api';

type LoginType = 'login' | 'register';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Sleep = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('login');
  const { refresh } = useModel('@@initialState');
  return (
    <div style={{ backgroundColor: 'white', marginTop: '10%' }}>
      <LoginForm
        logo="./movie.png"
        title="电影推荐"
        subTitle="2022 大数据系统设计与实现"
        // 在这里发起登录请求
        onFinish={async (values) => {
          const postData = {
            body: JSON.stringify(values as API.LoginForm),
          };

          const res =
            loginType === 'login'
              ? await login(postData)
              : await register(postData);

          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('login', 'yes');
            refresh();
            await Sleep(200);
            history.push('/movie/dailyReco');
            message.success(loginType === 'login' ? '登录成功' : '注册成功');
          } else {
            message.error(res.msg);
          }
          return true;
        }}
      >
        <Tabs
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'login'} tab={'登录'} />
          {/* <Tabs.TabPane key={'register'} tab={'注册'} /> */}
        </Tabs>
        {loginType === 'login' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {/* {loginType === 'register' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              name="username"
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              name="password"
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </>
        )} */}
      </LoginForm>
    </div>
  );
};
