import d from '../other/dominant.js';
import useCtrl from '../controllers/useCtrl.js';

class OCProfile {
  constructor() {
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });

    let url = new URL(location.href);
    this.id = url.searchParams.get('id');
    post('profile.load', this.id);
  }

  render = () => d.html`
    <div class="bg-neutral-200">
      <div class="max-w-5xl mx-auto shadow-lg bg-white min-h-screen">
        <div class="bg-[#2D2829] flex justify-between text-[#FA3973C2] p-4 items-center pb-16">
          <div class="flex gap-3 items-center">
            <div class="nf nf-fa-bars"></div>
            <img class="ml-4" src="images/myoc3.png">
          </div>
          <div class="flex gap-3">
            <div class="nf nf-fa-home"></div>
            <div class="nf nf-md-magnify"></div>
          </div>
        </div>
        <div class="aspect-square w-32 -mt-16 mx-auto rounded-full bg-[#CBCBCB] overflow-hidden">
          ${d.if(() => this.state.profile.avatar, d.html`<img class="w-full h-full object-cover" ${{ src: () => this.state.profile.avatar }}>`)}
        </div>
        <div class="text-center text-lg text-[#FA3973C2] font-bold mt-2">${d.text(() => this.state.profile.name)}</div>
        <div class="w-min ml-auto mr-4 text-xl -mt-9 mb-3 text-[#A7A7A7] group relative px-1">
          <button class="nf nf-md-dots_vertical"></button><div class="absolute pt-2 right-0 hidden group-hover:block">
            <div class="text-sm shadow-xl border border-[#00000010] bg-white rounded overflow-hidden whitespace-nowrap text-center">
              <a class="px-3 py-2 bg-white border-b border-[#00000010] block hover:bg-[#FFA1C3] hover:text-white" ${{ href: `create-profile?id=${this.id}` }}>Edit Profile</a>
            </div>
          </div>
        </div>
        <div class="text-center my-6 text-sm">${d.text(() => this.state.profile.description)}</div>
        <div class="border-b border-[#E3D9D9BD] mx-6 pb-2 md:mx-12">
          <div class="border-b mx-auto border-[#E3D9D9BD] w-40"></div>
          <div class="flex text-sm font-bold mt-1 text-[#A7A7A7] gap-3">
            <div class="flex-1 text-right">${d.text(() => this.state.profile.fi)} following</div>
            <div class="flex-1">${d.text(() => this.state.profile.fe)} followers</div>
          </div>
        </div>
        <div class="p-4 md:px-12">
          <div class="text-[#FA3973] font-bold">OC Profiles</div>
          ${d.if(() => !this.state.profile.ocProfiles.length, d.html`
            <div class="text-center px-4 font-neutral-400 pt-12 pb-4">
              <div class="nf nf-md-delete_empty w-min inline font-5xl"></div>
              <div class="mt-4 italic">Nothing to see here yet. </div>
            </div>
          `, d.html`
            <div class="grid grid-cols-3 mt-3 gap-4 md:grid-cols-6 lg:grid-cols-8">
              ${d.map(() => this.state.profile.ocProfiles, x => d.html`
                <div class="flex flex-col">
                  <div class="aspect-square rounded-full bg-[#CBCBCB] mb-2 overflow-hidden">
                    <img class="w-full h-full object-cover" ${{ src: x.avatar }}>
                  </div>
                  <div class="text-[#FF77A8] text-center">${d.text(() => x.name)}</div>
                </div>
              `)}
            </div>
            <div class="flex items-center justify-center text-xs gap-1 text-[#EBAFAFA1] mt-4">
              <span class="">All</span><div class="nf nf-fa-chevron_down"></div>
            </div>
          `)}
        </div>
        <div class="border-b border-[#E3D9D9BD] mx-6 mt-4 mb-3"></div>
        <div class="p-4 md:px-12">
          <div class="text-[#FA3973] font-bold">Gallery</div>
          <div class="grid grid-cols-3 mt-3 gap-1 md:grid-cols-4 lg:grid-cols-7">
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
          </div>
        </div>
        <div class="border-b border-[#E3D9D9BD] mx-6 mt-4 mb-3"></div>
        <div class="p-4 md:px-12">
          <div class="text-[#FA3973] font-bold">Collection</div>
          <div class="grid grid-cols-3 mt-3 gap-1 md:grid-cols-4 lg:grid-cols-7">
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
            <div class="aspect-square bg-[#CBCBCB]"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default OCProfile;
