import {useEffect, useState} from 'react';

export default axios => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(res => res, err => {
    setError(err);
  })

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [axios, resInterceptor, reqInterceptor]);

  const clearErrorHandler = () => setError(null);

  return [error, clearErrorHandler];
};
