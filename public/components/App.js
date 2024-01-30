import CreateOC from './CreateOC.js';
import Home from './Home.js';
import OCProfile from './OCProfile.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Welcome from './Welcome.js';
import d from '../other/dominant.js';
import useCtrl from '../controllers/useCtrl.js';

class App {
  constructor() {
    window.app = this;
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });
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
      case 'home': this.content = d.el(Home); break;
      //case 'my-oc': this.content = d.el(MyOC); break;
      case 'oc-profile': this.content = d.el(OCProfile); break;
      case 'create-oc': this.content = d.el(CreateOC); break;
      //case 'submit-work': this.content = d.el(SubmitWork); break;
    }

    d.update();
  }

  render = () => d.portal(() => this.content);
}

export default App;
