import _ from 'lodash';

const queryAPI = (delay) => {
  const reject = (_, reject) => { reject('Ops!') };
  const resolve = (resolve, _) => { resolve({ data: 'A0B3HCJ' }) };
  const callback = (delay === undefined) ? reject : resolve;

  return new Promise(_.debounce(callback, delay || 0));
};

export default queryAPI;
