import axios from 'axios';

const get = (url, config) => axios.get(url, config).then((res) => res.data);
const post = (url, payload, config) => axios.post(url, payload, config).then((res) => res.data);

export { get, post };
