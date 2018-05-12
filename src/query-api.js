import _ from 'lodash';

const queryAPI = (delay) => {
  return new Promise(_.debounce((resolve, reject) => {
    resolve({ data: 'A0B3HCJ' })
  }, delay));
};

export default queryAPI;
