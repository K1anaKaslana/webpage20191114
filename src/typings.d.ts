declare namespace API {
  // 登录表单
  type LoginForm = {
    username: string;
    password?: string;
  };

  // 登录、注册的返回信息
  type LoginData = {
    token?: string;
    msg?: string;
    success: boolean;
  };

  // 当前用户信息
  type CurrentUser = {
    data: {
      id: string;
      username: string;
      tags: {
        type: string;
        value: number;
      }[];
    };
    msg: string;
    success: boolean;
  };

  // 电影简要信息
  type MovieDaily = {
    id: string;
    title_cn: string;
    title_en?: string;
    tags: string[];
    score?: string;
    eva_num?: string;
    picture?: string;
    content?: string;
    release_date?: string[];
  };

  // 电影详细信息
  type MovieDetail = {
    info: MovieDaily;
    eva_people_num: string; // 评分总人数
    stars_num: {
      // 评分人数占比
      s5: string;
      s4: string;
      s3: string;
      s2: string;
      s1: string;
    };
    eva_short_num: string; // 短评数
    director: string; // 导演
    screenwriter: string[]; // 编剧
    lead_actor: string[]; // 主演
    region: string[]; // 制片国家或地区
    language: string[]; // 语言
    release_date: string[]; // 上映日期
    film_length: string; // 片长（分钟）
    douban_site: string; // 豆瓣网址
    official_site: string; // 官方网址
    IMDb_site: string; // IMDb网址
    total_score: string; // 总分: 评分x评价人数
  };

  // 电影评论信息
  type MovieComment = {
    movie_id: string;
    movie: string;
    reviewer: string;
    time: string;
    rating: string;
    vote_count: string;
    comment: string;
  };

  // 全部电影列表
  type MovieAll = {
    id: string;
    title_cn: string;
    title_en?: string;
    score: string;
    tags: string[];
    director: string;
    release_date: string[];
    picture: string;
  };

  // 用户信息
  type UserInfo = {
    id: string;
    name: string;
    tags: {
      type: string;
      value: number;
    }[];
  };
}
