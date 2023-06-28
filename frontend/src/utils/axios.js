import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '': 'http://localhost:4000' //좌측은 배포한 이후의 baseURL(중복되는 URI)를 배치
});

axiosInstance.interceptors.request.use(function (config) {

    config.headers.Authorization = 'Bearer' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
})

export default axiosInstance;