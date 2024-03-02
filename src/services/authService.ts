import { environment } from '../environments/environment';
import fetch from '../helpers/ApiConfig';

const baseUrl = environment.apiURL;

const authService = {
  async login(data: {}) {
    return await fetch(baseUrl, 'POST', 'application/json', '/auth', data);
  },
};

export { authService };
