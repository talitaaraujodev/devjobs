import { environment } from '../environments/environment';
import fetch from '../helpers/ApiConfig';

const baseUrl = environment.apiURL;

const userService = {
  async createUser(data: {}) {
    return await fetch(baseUrl, 'POST', 'application/json', '/users', data);
  },
  async getUserById(id: string) {
    return await fetch(baseUrl, 'GET', 'application/json', `/users/${id}`);
  },
  async getUserLogged() {
    return await fetch(baseUrl, 'GET', 'application/json', '/users/me');
  },
};

export { userService };
