import axios from 'axios';

export class AuthenticateService {
  public login( username: string, password: string ): Promise<any> {
    return axios.post('/api/authenticate/login', { username, password });

  }
}