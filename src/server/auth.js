import axios from 'axios';

class AuthApi {
  async authenticationEmail(email, fun) {
    await axios.post(`/auth/mail-auth`, {email: email})
      .then(res => fun)
      .catch(error => console.log(error))
  };

  async checkEmailAuthMail(authInfo) {
    await axios.post(`/auth/mail-auth-check`, authInfo);
  }
};

export const authApi = new AuthApi();