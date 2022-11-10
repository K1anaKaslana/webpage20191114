/*
 * @Author: Leniakea
 * @Date: 2022-11-03 09:08:25
 * @LastEditors: Leniakea
 * @LastEditTime: 2022-11-09 09:45:33
 * @FilePath: \webpage\src\pages\userInfo\index.tsx
 */
import { ProCard, ProList } from '@ant-design/pro-components';
import { Descriptions, List, Card, Pagination, Rate, Button } from 'antd';
import React, { useState, useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import {
  history,
  connect,
  ConnectProps,
  UserInfoModelState,
  useModel,
} from 'umi';
import request from 'umi-request';

interface PageProps extends ConnectProps {
  // MovieDetail是model的namespace，其它名称为undefined
  UserInfo: UserInfoModelState;
  dispatch: any;
}

const data = [
  {
    title: '肖申克的救赎',
  },
  {
    title: '杰哥',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const IndexPage: FC<PageProps> = (props) => {
  const token = localStorage.getItem('token');

  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');

  const DemoPie = () => {
    const data = initialState?.data.tags;
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}',
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };

  return (
    <div style={{ marginLeft: '15%', marginRight: '15%' }}>
      <ProCard split="horizontal">
        <ProCard>
          <Descriptions title="个人信息">
            <Descriptions.Item label="用户名">
              {initialState?.data.username}
            </Descriptions.Item>
            <Descriptions.Item label="用户ID">
              {initialState?.data.id}
            </Descriptions.Item>
          </Descriptions>
        </ProCard>
        <ProCard>
          <h3>
            <b>我的标签</b>
          </h3>
          <div>
            <DemoPie />
          </div>
        </ProCard>
        <ProCard>
          <h3>
            <b>我的评论</b>
          </h3>
          <ProList<any>
            // onRow={(record: any) => {
            //   return {
            //     onClick: () => {
            //       localStorage.setItem('movie_id', record.movie_id);
            //       localStorage.setItem('pre_page', '个人信息');
            //     },
            //   };
            // }}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            request={async (params = {}) =>
              request<{
                data: API.MovieComment[];
              }>('/api/user/comment', {
                headers: {
                  Authorization: 'Bearer ' + String(token),
                },
                params,
              })
            }
            rowKey="movie"
            showActions="hover"
            showExtra="hover"
            metas={{
              title: {
                dataIndex: 'movie',
              },
              description: {
                dataIndex: 'time',
              },
              subTitle: {
                render: (_, row) => {
                  return <Rate disabled defaultValue={parseInt(row.rating)} />;
                },
              },
              content: {
                dataIndex: 'comment',
              },
              actions: {
                dataIndex: 'movie',
                render: (_, row) => [
                  <Button
                    type="link"
                    onClick={() => {
                      localStorage.setItem('movie_id', row.movie_id);
                      localStorage.setItem('pre_page', '个人信息');
                      history.push('/movie/detail');
                    }}
                  >
                    电影详情
                  </Button>,
                ],
              },
            }}
          />
        </ProCard>
      </ProCard>
    </div>
  );
};

// export default connect((UserInfo: any) => UserInfo)(IndexPage);
export default IndexPage;
