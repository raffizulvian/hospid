import axios from 'axios';

const get = (url) => axios.get(url).then((res) => res.data);

// eslint-disable-next-line import/prefer-default-export
export { get };
