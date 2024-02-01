import d from '../other/dominant.js';
import useCtrl from '../controllers/useCtrl.js';

class SignUp {
  constructor() {
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });
    post('auth.reset');
  }

  onSubmit = ev => { ev.preventDefault(); this.post('auth.signUp') };

  render = () => d.html`
    <div class="flex flex-col justify-center items-center py-24 h-screen bg-[#F1F1F1]">
      <img class="w-64 -mt-24" src="images/myoc2.png">
      <form ${{ onChange: ev => this.state.auth[ev.target.name] = ev.target.value, onSubmit: this.onSubmit }}>
        ${d.if(() => this.state.auth.error, d.html`
          <div class="text-red-500 italic text-center mb-2">${d.text(() => this.state.auth.error)}</div>
        `)}
        <div class="flex flex-col gap-1">
          <input class="w-80 px-4 outline-none text-[#A7A7A7] font-bold font-sm py-3" name="email" placeholder="E-mail address">
          <input class="w-80 px-4 outline-none text-[#A7A7A7] font-bold font-sm py-3" type="password" name="password" placeholder="Password">
          <input class="w-80 px-4 outline-none text-[#A7A7A7] font-bold font-sm py-3" type="password" name="confirmPassword" placeholder="Confirm Password">
        </div>
        <button class="py-3 bg-[#FA3973] text-white w-80 rounded-full uppercase mt-6" type="submit">Create Account</button>
      </form>
      <a class="text-[#CBCBCB] font-bold text-sm mt-12" href="..">Go back</a>
    </div>
  `;
}

export default SignUp;
