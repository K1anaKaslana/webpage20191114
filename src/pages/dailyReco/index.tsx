import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag, Space } from 'antd';
import React from 'react';
import TagColor from '@/TagColor';
import request from 'umi-request';
import { history } from 'umi';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

export default () => {
  const token = localStorage.getItem('token');
  return (
    <div
      style={{
        marginLeft: '15%',
        marginRight: '15%',
      }}
    >
      <ProList<API.MovieDaily>
        itemLayout="vertical"
        rowKey="id"
        headerTitle="每日推荐"
        // dataSource={dataSource}
        // request请求默认的数据格式为:
        // {data: [], pageSize: 10, current: 1, total:28, success: true}
        request={async (params = {}) =>
          request<{
            data: API.MovieDaily[];
          }>('/api/movie/dailyReco', {
            headers: {
              Authorization: 'Bearer ' + String(token),
            },
            params,
          })
        }
        pagination={{
          defaultPageSize: 5,
          // showSizeChanger: true,
        }}
        metas={{
          title: {
            dataIndex: 'title_cn',
          },
          description: {
            dataIndex: 'tags',
            render: (_, row) => {
              return (
                <Space size={0}>
                  {row.tags?.map((tag: string) => (
                    <Tag color={TagColor[tag]} key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              );
            },
          },
          actions: {
            dataIndex: 'nums',
            render: (_, row) => [
              <IconText
                icon={StarOutlined}
                text={row.score || '0'}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={row.eva_num || '0'}
                key="list-vertical-message"
              />,
              // <Link to={'/movie/detail?ID=' + row.id}>详情</Link>,
              <Button
                type="link"
                onClick={() => {
                  localStorage.setItem('movie_id', row.id);
                  localStorage.setItem('pre_page', '每日推荐');
                  history.push('/movie/detail');
                }}
              >
                详情
              </Button>,
            ],
          },
          extra: {
            dataIndex: 'picture',
            render: (text: string) => (
              <img width={180} alt="picture" src={text} />
            ),
          },
          content: {
            dataIndex: 'content',
            render: (text) => {
              return <div style={{ width: '75%', height: '80%' }}>{text}</div>;
            },
          },
        }}
      />
    </div>
  );
};
