import axios from 'axios';

const get = (url) => axios.get(url).then((res) => res.data);
const post = (url, payload) => axios.post(url, payload).then((res) => res.status);

export { get, post };
