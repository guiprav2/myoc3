import d from '../other/dominant.js';

class Welcome {
  render = () => d.html`
    <div class="flex flex-col justify-center items-center py-24 h-screen bg-[#2D2829]">
      <img class="w-64 -mt-24" src="images/myoc.png">
      <a class="py-3 bg-[#FA3973] text-white w-80 uppercase text-center" href="sign-in">Login</a>
      <a class="text-[#CBCBCB] font-bold text-sm mt-12" href="sign-up">Create account</a>
    </div>
  `;
}

export default Welcome;
