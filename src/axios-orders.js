import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-574bd.firebaseio.com/'
});

export default instance;
