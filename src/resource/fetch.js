import axios from 'axios';
import localforage from 'localforage';

// 所属环境
const ENV = process.env.NODE_ENV;

// 默认超时时间
const TIME_OUT = 30000;

// 创建axios实例
const service = axios.create({
  timeout: TIME_OUT
});

// TODO 不需要权限验证拦截的白名单请求
const whiteList = ['/'];

// request 请求发送之前 拦截器
service.interceptors.request.use(
  async config => {
    // 发送请求之前
    const url = config.url || '';
    let inWhite = whiteList.filter(item => url.indexOf(item) > -1);
    if (!(inWhite && inWhite.length > 0)) {
      const accessToken = await localforage.getItem('accessToken');
      if (accessToken) {
        // TODO 后台添加 header ： accessToken
        config.headers.accessToken = accessToken; // 让每个请求携带 accessToken
      } else {
        // TODO 无权限
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// request 请求收到后 拦截器设置
service.interceptors.response.use(
  response => {
    if (response) {
      // 检查状态
      if (response.status >= 200 && response.status < 400) {
        return response.data;
      }
    }
    // TODO 接口调用失败
  },
  error => {
    // TODO 接口调用失败
    console.error(
      ENV === 'development' ? '服务器端产生错误！' : '网络因素，请稍后重试！'
    );
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

export default service;
