import rauth from '../repositories/AuthRepository.js';

class AuthCtrl {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
  };

  actions = {
    reset: () => {
      this.state.email = '';
      this.state.password = '';
      this.state.confirmPassword = '';
      this.state.error = null;
    },

    signIn: async () => {
      this.state.error = null;
      d.update();
      if (!this.state.email) { this.state.error = 'E-mail required.'; return }
      if (!this.state.password) { this.state.error = 'Password required.'; return }
      let res = await rauth.signIn({ email: this.state.email, password: this.state.password });
      if (res.error) { this.state.error = res.error; return }
      localStorage.setItem('myoc.token', res.token);
      history.pushState(null, '', 'home');
    },

    signUp: async () => {
      this.state.error = null;
      d.update();
      if (!this.state.email) { this.state.error = 'E-mail required.'; return }
      if (!this.state.password) { this.state.error = 'Password required.'; return }
      if (this.state.password !== this.state.confirmPassword) { this.state.error = `Password and confirmation don't match.`; return }
      let res = await rauth.signUp({ email: this.state.email, password: this.state.password });
      if (res.error) { this.state.error = res.error; return }
      localStorage.setItem('myoc.token', res.token);
      history.pushState(null, '', 'create-profile');
    },
  };
}

export default AuthCtrl;
