import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Tag, Image, Button, Space } from 'antd';
import { Typography, Divider, Rate } from 'antd';
import { history, connect, ConnectProps, MovieDetailModelState } from 'umi';
import { FC } from 'react';
import React from 'react';
import { Bar } from '@ant-design/plots';
import { ProList } from '@ant-design/pro-components';
import { StarTwoTone, LikeOutlined } from '@ant-design/icons';
import request from 'umi-request';
import TagColor from '@/TagColor';

interface PageProps extends ConnectProps {
  // MovieDetail是model的namespace，其它名称为undefined
  MovieDetail: MovieDetailModelState;
  dispatch: any;
}

const { Title, Paragraph, Text, Link } = Typography;

// const starIcon = {
//   '5': ['', '', '', '', ''],
//   '4': ['', '', '', ''],
//   '3': ['', '', ''],
//   '2': ['', ''],
//   '1': [''],
// };

const IndexPage: FC<PageProps> = (props) => {
  const token = localStorage.getItem('token');
  const movie_id = localStorage.getItem('movie_id');
  const movieData = props.MovieDetail.data;
  const info = movieData.info;
  const StarBar = () => {
    const stars = movieData.stars_num;
    const data = [
      {
        star: '5星',
        value: parseFloat(stars.s5),
      },
      {
        star: '4星',
        value: parseFloat(stars.s4),
      },
      {
        star: '3星',
        value: parseFloat(stars.s3),
      },
      {
        star: '2星',
        value: parseFloat(stars.s2),
      },
      {
        star: '1星',
        value: parseFloat(stars.s1),
      },
    ];
    const config = {
      data,
      xField: 'value',
      yField: 'star',
      seriesField: 'star',
      legend: false,
      color: '#FAAD14',
    };
    return <Bar {...config} />;
  };
  const pre_page = localStorage.getItem('pre_page');
  const pre_page_herf = {
    每日推荐: '/movie/dailyReco',
    全部电影: '/movie/all',
    个人信息: '/user/info',
  };
  return (
    <div
      style={{
        marginLeft: '15%',
        marginRight: '15%',
      }}
    >
      <PageContainer
        header={{
          title: info.title_cn,
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path:
                  pre_page_herf[pre_page || '每日推荐'] || '/movie/dailyReco',
                breadcrumbName: pre_page || '每日推荐',
              },
              {
                path: '',
                breadcrumbName: info.title_cn,
              },
            ],
          },
        }}
      >
        <ProCard split="horizontal">
          <ProCard split="vertical">
            <ProCard colSpan="20%">
              <div style={{}}>
                <Image src={info.picture} />
              </div>
              <Divider />
              <div>外文名：{movieData.info.title_en}</div>
              <div>电影时长：{movieData.film_length}分钟</div>
              <Divider />
              <div>
                <a href={movieData.IMDb_site}>IMDb主页</a>
                <> | </>
                <a href={movieData.douban_site}>豆瓣主页</a>
              </div>
            </ProCard>
            <ProCard colSpan="60%">
              <Typography>
                <Title level={5}>简介</Title>
                <Paragraph>{info.content}</Paragraph>
                <Title level={5}>导演</Title>
                <Paragraph>{<>{movieData.director}</>}</Paragraph>
                <Title level={5}>编剧</Title>
                <Paragraph>
                  {movieData.screenwriter.map((name: string) => (
                    <>{name + ' | '}</>
                  ))}
                </Paragraph>
                <Title level={5}>主演</Title>
                <Paragraph>
                  {movieData.lead_actor.map((name: string) => (
                    <> {name + ' | '}</>
                  ))}
                </Paragraph>
              </Typography>
            </ProCard>
            <ProCard colSpan="20%" split="horizontal">
              <ProCard>
                <div>评分人数：{movieData.eva_people_num}</div>
                <div>评分：{info.score || '暂无评分'}</div>
              </ProCard>
              <ProCard bodyStyle={{ height: '150px' }}>
                <StarBar />
              </ProCard>
              <ProCard>
                <div style={{ marginBottom: '5px' }}>标签</div>
                {info.tags?.map((name: string) => (
                  <Tag color={TagColor[name]} key={name}>
                    {name}
                  </Tag>
                ))}
              </ProCard>
              <ProCard>
                <div style={{ marginBottom: '5px' }}>地区</div>
                {movieData.region.map((name: string) => (
                  <Tag color="blue" key={name}>
                    {name}
                  </Tag>
                ))}
              </ProCard>
              <ProCard>
                <div style={{ marginBottom: '5px' }}>上映时间</div>
                {movieData.release_date.map((name: string) => (
                  <div>{name}</div>
                ))}
              </ProCard>
            </ProCard>
          </ProCard>
          <ProCard>
            <ProList<API.MovieComment>
              itemLayout="vertical"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
              }}
              request={async (params = {}) =>
                request<{
                  data: API.MovieComment[];
                }>('/api/movie/comment', {
                  headers: {
                    Authorization: 'Bearer ' + String(token),
                  },
                  params: {
                    ...params,
                    movie_id: movie_id,
                  },
                })
              }
              rowKey="name"
              headerTitle="精选评论"
              showActions="hover"
              showExtra="hover"
              metas={{
                title: {
                  dataIndex: 'reviewer',
                  // render: (text, row) => [
                  //   <a href={row.reviewer_link} style={{ color: 'black' }}>
                  //     {text}
                  //   </a>,
                  // ],
                },
                // avatar: {
                //   dataIndex: 'image',
                // },
                content: {
                  dataIndex: 'comment',
                },
                subTitle: {
                  render: (_, row) => {
                    return (
                      <Rate disabled defaultValue={parseInt(row.rating)} />
                    );
                  },
                },
                description: {
                  dataIndex: 'time',
                },
              }}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  );
};

export default connect((MovieDetail: any) => MovieDetail)(IndexPage);
