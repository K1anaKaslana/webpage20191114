import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Image } from 'antd';
import { useRef } from 'react';
import { history } from 'umi';
import request from 'umi-request';

import TagColor from '@/TagColor';
import TagEnum from './colorTagEnum';

const dataSource = [
  {
    movie_id: '123',
    title_cn: '肖申克的救赎',
    title_en: 'The Shawshank Redemption',
    tags: ['剧情', '犯罪'],
    director: '弗兰克·德拉邦特',
    release_date: '1994-09-10(多伦多电影节)',
    picture: '',
  },
];

const columns: ProColumns<API.MovieAll>[] = [
  {
    title: '海报',
    dataIndex: 'picture',
    hideInSearch: true,
    width: 140,
    render: (_, record) => (
      <div>
        <Image width={120} src={record.picture} />
      </div>
    ),
  },
  {
    title: '中文名',
    dataIndex: 'title_cn',
    ellipsis: true,
    render: (_, record) => (
      <a href="#/movie/detail" style={{ color: 'black' }}>
        {record.title_cn}
      </a>
    ),
  },
  {
    title: '外文名',
    dataIndex: 'title_en',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '评分',
    dataIndex: 'score',
    hideInSearch: true,
    ellipsis: true,
    width: 60,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    valueType: 'select',
    valueEnum: TagEnum,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <>
        {record.tags.map((tag: string) => (
          <Tag color={TagColor[tag]} key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: '导演',
    dataIndex: 'director',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '上映日期',
    dataIndex: 'release_date',
    hideInSearch: true,
    ellipsis: true,
    render: (_, record) => (
      <>
        {record.release_date.map((date: string) => (
          <div>{date}</div>
        ))}
      </>
    ),
  },
];

export default () => {
  const token = localStorage.getItem('token');
  const actionRef = useRef<ActionType>();
  return (
    <div style={{ marginLeft: '15%', marginRight: '15%' }}>
      <ProTable<any>
        headerTitle="全部电影"
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          // onChange: (page) => console.log(page),
        }}
        // dataSource={dataSource}
        request={async (params = {}, sort, filter) => {
          // console.log(sort, filter);
          return request<{
            data: API.MovieAll[];
          }>('/api/movie/all', {
            headers: {
              Authorization: 'Bearer ' + String(token),
            },
            params,
          });
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              localStorage.setItem('movie_id', record.id);
              localStorage.setItem('pre_page', '全部电影');
            }, // 点击行
          };
        }}
      />
    </div>
  );
};
