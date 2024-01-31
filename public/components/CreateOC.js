import d from '../other/dominant.js';
import useCtrl from '../controllers/useCtrl.js';

class OCProfile {
  constructor() {
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });

    let url = new URL(location.href);
    this.id = url.searchParams.get('id');
    this.id ? post('ocProfile.load', this.id) : post('ocProfile.reset');
  }

  render = () => d.html`
    <div class="relative bg-neutral-200">
      <div class="mx-auto max-w-5xl shadow-xl bg-neutral-100 min-h-screen flow-root">
        <div class="bg-[#2D2829] flex justify-between text-[#FA3973C2] p-4 items-center">
          <div class="flex gap-3 items-center">
            <button class="nf nf-fa-bars"></button>
            <img class="ml-4" src="images/myoc3.png">
          </div>
          <div class="flex gap-3">
            <button class="nf nf-fa-home"></button>
            <button class="nf nf-md-magnify"></button>
          </div>
        </div>
        <input class="text-center text-[#FF77A8] font-xl my-3 outline-none mx-auto block bg-transparent" ${{
          value: d.binding({ get: () => this.state.ocProfile.name, set: x => this.state.ocProfile.name = x }),
          placeholder: 'OC Name',
        }}>
        <div class="w-min ml-auto mr-4 text-xl -mt-9 mb-3 text-[#A7A7A7] group relative">
          <button class="nf nf-md-dots_vertical"></button>
          <div class="absolute pt-2 right-0 hidden group-hover:block">
            <div class="text-sm shadow-xl border border-[#00000010] bg-white rounded overflow-hidden whitespace-nowrap text-center">
              <a class="px-3 py-2 bg-white border-b border-[#00000010] block hover:bg-[#FFA1C3] hover:text-white" ${{ onClick: () => this.post('ocProfile.save') }}>Save</a>
              <a class="px-3 py-2 bg-white block hover:bg-[#FFA1C3] hover:text-white" ${{ onClick: () => this.post('ocProfile.cancelEdit') }}>Cancel</a>
            </div>
          </div>
        </div>
        <div class="relative flex justify-center items-center aspect-square w-32 overflow-hidden mx-auto mb-12 rounded-full bg-[#CBCBCB]">
          ${d.if(() => this.state.ocProfile.avatar, d.html`
            <img class="w-full h-full object-cover" ${{ src: () => this.state.ocProfile.avatar + '?w=400' }}>
            <button class="absolute left-0 right-0 top-0 bottom-0 w-full text-center text-neutral-200 bg-[#00000075] opacity-0 hover:opacity-100" ${{
              onClick: () => this.post('ocProfile.avatarUpload'),
            }}>change</button>
          `, d.html`
            <button class="absolute left-0 right-0 top-0 bottom-0 w-full nf nf-fa-plus text-white" ${{ onClick: () => this.post('ocProfile.avatarUpload') }}></button>
          `)}
        </div>
        <div class="m-4 flex flex-col">
          <div class="text-[#2D2829] border-b border-[#E3D9D9BD] pb-1">Story</div>
          <textarea class="mt-3 text-[#454545] mx-3 block outline-none px-3 py-2 h-32" ${{
            value: d.binding({ get: () => this.state.ocProfile.story, set: x => this.state.ocProfile.story = x}),
            placeholder: 'Text...',
          }}></textarea>
        </div>
        ${d.if(() => this.state.ocProfile.bio, d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Biographical Information</div>
            <div class="p-4 grid grid-cols-2 gap-2 text-sm items-center">
              ${d.map(() => Object.keys(this.state.ocProfile.bio), x => d.html`
                <div>${x}:</div>
                <input class="outline-none px-3 py-2" ${{
                  value: d.binding({ get: () => this.state.ocProfile.bio[x], set: y => this.state.ocProfile.bio[x] = y }),
                }}>
              `)}
            </div>
          </div>
        `)}
        ${d.if(() => this.state.ocProfile.physical, d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Physical Description</div>
            <div class="p-4 grid grid-cols-2 gap-2 text-sm items-center">
              ${d.map(() => Object.keys(this.state.ocProfile.physical), x => d.html`
                <div>${x}:</div>
                <input class="outline-none px-3 py-2" ${{
                  value: d.binding({ get: () => this.state.ocProfile.physical[x], set: y => this.state.ocProfile.physical[x] = y }),
                }}>
              `)}
            </div>
          </div>
        `)}
        ${d.if(() => this.state.ocProfile.gallery, d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Gallery</div>
            <div class="p-4 grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6">
              ${d.map(() => this.state.ocProfile.gallery, x => d.html`
                <img class="w-full h-full aspect-square object-cover bg-[#CBCBCB]" ${{ src: () => x.url + '?w=400', onClick: () => this.post('ocProfile.submitWork', x) }}>
              `)}
              <button class="flex justify-center items-center aspect-square text-white bg-[#CBCBCB]" ${{ onClick: () => this.post('ocProfile.submitWork') }}>
                <i class="nf nf-fa-plus"></i>
              </button>
            </div>
          </div>
        `)}
        ${d.if(() => !this.state.ocProfile.bio || !this.state.ocProfile.physical || !this.state.ocProfile.gallery, d.html`
          <div class="w-min mx-auto my-8 group relative">
            <div class="absolute -translate-x-[50%] bottom-[100%] hidden group-hover:block w-min whitespace-nowrap pb-4">
              <div class="bg-white border border-[#00000010] shadow-xl rounded text-sm overflow-hidden text-[#A7A7A7]">
                ${d.if(() => !this.state.ocProfile.bio, d.html`
                  <a class="px-3 py-2 border-b border-[#00000010] hover:bg-[#FFA1C3] hover:text-white block" ${{
                    onClick: () => this.post('ocProfile.createBio'),
                  }}>
                    Biographical Information
                  </a>
                `)}
                ${d.if(() => !this.state.ocProfile.physical, d.html`
                  <a class="px-3 py-2 border-b border-[#00000010] hover:bg-[#FFA1C3] hover:text-white block" ${{
                    onClick: () => this.post('ocProfile.createPhysical'),
                  }}>
                    Physical Description
                  </a>
                `)}
                ${d.if(() => !this.state.ocProfile.gallery, d.html`
                  <a class="px-3 py-2 border-b border-[#00000010] hover:bg-[#FFA1C3] hover:text-white block" ${{
                    onClick: () => this.post('ocProfile.createGallery'),
                  }}>
                    Gallery
                  </a>
                `)}
              </div>
            </div>
            <div class="nf nf-fa-plus bg-[#A7A7A7] rounded-full p-1 text-white w-min mx-auto"></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

export default OCProfile;
