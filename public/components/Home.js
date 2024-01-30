import d from '../other/dominant.js';
import useCtrl from '../controllers/useCtrl.js';

class Home {
  constructor() {
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });
    post('home.reset');
    post('home.load');
  }

  hasLiked(x) { return Boolean(this.state.home.likes.find(y => y.imgUrl === x.imgUrl)) }

  render = () => d.html`
    <div class="max-w-5xl mx-auto bg-neutral-100 min-h-screen shadow-xl">
      <div class="bg-[#2D2829] flex justify-between text-[#FA3973C2] p-4 items-center">
        <div class="flex gap-3 items-center">
          <div class="nf nf-fa-bars"></div>
          <img class="ml-4" src="images/myoc3.png">
        </div>
        <div class="flex gap-3">
          <div class="nf nf-fa-home"></div>
          <div class="nf nf-md-magnify"></div>
        </div>
      </div>
      <div class="bg-white flex justify-around text-xs p-2 md:p-3 md:text-sm">
        <button ${{
          class: ['rounded-lg px-3', () => this.state.home.currentTab === 'recommended' && 'text-white bg-[#FFA1C3]'],
          onClick: () => this.post('home.changeTab', 'recommended'),
        }}>Recommended</button>
        <button ${{
          class: ['rounded-lg px-3', () => this.state.home.currentTab === 'collection' && 'text-white bg-[#FFA1C3]'],
          onClick: () => this.post('home.changeTab', 'collection'),
        }}>Collection</button>
        <button ${{
          class: ['rounded-lg px-3', () => this.state.home.currentTab === 'myoc' && 'text-white bg-[#FFA1C3]'],
          onClick: () => this.post('home.changeTab', 'myoc'),
        }}>My OC</button>
        <button ${{
          class: ['rounded-lg px-3', () => this.state.home.currentTab === 'gallery' && 'text-white bg-[#FFA1C3]'],
          onClick: () => this.post('home.changeTab', 'gallery'),
        }}>Gallery</button>
      </div>
      <div class="grid grid-cols-2 p-4 gap-1 md:grid-cols-4">
        ${d.map(() => this.state.home.list, x => d.html`
          <div class="aspect-square bg-[#CBCBCB] relative flex flex-col justify-center">
            <img class="w-full h-full object-cover" ${{ src: () => x.imgUrl }}>
            <button ${{
              class: ['absolute right-1 bottom-1 nf', () => this.hasLiked(x) ? 'nf-md-heart text-[#FA3973]' : 'nf-oct-heart'],
              onClick: () => this.post('home.toggleLike', x),
            }}></button>
          </div>
        `)}
      </div>
    </div>
  `;
}

export default Home;
