import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.request.use(function (config) {
  // 요청이 전달되기 전에 작업 수행
  const accessToken = localStorage.getItem('token');
  
  if (accessToken === '' || accessToken === null)
    window.location.href = '/login';
  else
    config.headers['Authorization'] = accessToken;

  return config;
}, function (error) {
  // 요청 오류가 있는 작업 수행
  return Promise.reject(error);
});

customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // 응답 오류 발생 시 작업 수행
    const {response: errorResponse} = error;
    const originalRequest = error.config;

    // 인증 에러 발생 시
    if (errorResponse.status === 401) {
      localStorage.removeItem('token');
      window.location.replace('/login');
    }
    // 서버 에러 발생 시
    else if (errorResponse.status >= 500) {
      window.location.replace('/server-error');
    }

    return Promise.reject(error);
  }
);

export default customAxios;