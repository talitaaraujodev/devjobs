import { utils } from '../utils';

const request = async (url: string, method: string, contentType: string, sufix: string, body?: any) => {
  try {
    const headersConfig = new Headers();

    let fetchConfig: RequestInit = {
      method: method,
      headers: headersConfig,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    if (contentType === 'application/json') {
      headersConfig.set('Content-Type', contentType);
    }

    if (body) {
      fetchConfig.body = contentType === 'application/json' ? JSON.stringify(body) : body;
    }
    const token = utils.getToken();
    if (token) {
      headersConfig.set('Authorization', `Bearer ${token}`);
    }
    const requestUrl = `${url}${sufix}`;
    const response = await fetch(requestUrl, fetchConfig);
    if (response.status === 401) {
      utils.setToken('');
      window.location.href = '/login';
      return;
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao realizar requisição requisição:', error);
  }
};
export default request;
