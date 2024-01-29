import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Welcome from './Welcome.js';
import d from '../other/dominant.js';

class App {
  constructor() {
    this.updateRouter();

    let self = this;
    let origPushState = history.pushState;
    history.pushState = function(...args) {
      origPushState.call(this, ...args);
      self.updateRouter();
    };

    addEventListener('popstate', () => this.updateRouter());
  }

  updateRouter() {
    let path = location.pathname.slice(1);
    if (path.startsWith('myoc3/')) { path = path.slice('myoc3/'.length) }

    switch (path) {
      case '': this.content = d.el(Welcome); break;
      case 'sign-in': this.content = d.el(SignIn); break;
      case 'sign-up': this.content = d.el(SignUp); break;
      //case 'home': this.content = d.el(Home); break;
      //case 'my-oc': this.content = d.el(MyOC); break;
      //case 'oc': this.content = d.el(OC); break;
      //case 'create-oc': this.content = d.el(CreateOC); break;
      //case 'submit-work': this.content = d.el(SubmitWork); break;
    }

    d.update();
  }

  render = () => d.portal(() => this.content);
}

export default App;
