import axios from "axios";

const customAxios = axios.create({
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

customAxios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default customAxios;