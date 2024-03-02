import { environment } from '../environments/environment';
import fetch from '../helpers/ApiConfig';

const baseUrl = environment.apiURL;

const profileService = {
  async createProfile(data: {}) {
    return await fetch(baseUrl, 'POST', 'multipart/form-data', '/profiles', data);
  },
};

export { profileService };
