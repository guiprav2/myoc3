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
      <div class="min-h-screen mx-auto max-w-5xl shadow-xl bg-neutral-100">
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
        <div class="text-center text-[#FF77A8] font-xl my-3">${d.text(() => this.state.profile.name)}</div>
        <div class="w-min ml-auto mr-4 text-xl -mt-9 mb-3 text-[#A7A7A7] group relative">
          <button class="nf nf-md-dots_vertical"></button><div class="absolute pt-2 right-0 hidden group-hover:block">
            <div class="text-sm shadow-xl border border-[#00000010] bg-white rounded overflow-hidden whitespace-nowrap text-center">
              <a class="px-3 py-2 bg-white border-b border-[#00000010] block hover:bg-[#FFA1C3] hover:text-white" ${{ href: `create-oc?id=${this.id}` }}>Edit</a>
              <a class="px-3 py-2 bg-white block hover:bg-[#FFA1C3] hover:text-white">Delete OC</a>
            </div>
          </div>
        </div>
        <div class="aspect-square w-32 mx-auto rounded-full bg-[#CBCBCB] overflow-hidden">
          ${d.if(() => this.state.profile.avatar, d.html`<img class="h-full object-cover" ${{ src: () => this.state.profile.avatar }}>`)}
        </div>
        ${d.if(() => this.state.profile.story, d.html`
          <div class="m-4">
            <div class="text-[#2D2829] border-b border-[#E3D9D9BD] pb-1">Story</div>
            <div class="mt-3 text-[#454545] mx-3">${d.text(() => this.state.profile.story)}</div>
            <button class="block nf nf-fa-chevron_down mx-auto w-min text-[#FA3973] mt-2 mb-8"></button>
          </div>
        `)}
        ${d.if(() => this.state.profile.bio && Object.values(this.state.profile.bio).some(Boolean), d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Biographical Information</div>
            <div class="p-4 grid grid-cols-2 gap-2 text-sm">
              ${d.map(() => Object.keys(this.state.profile.bio), x => d.if(() => this.state.profile.bio[x], d.html`
                <div>${x}:</div>
                <div>${d.text(() => this.state.profile.bio[x])}</div>
              `))}
            </div>
          </div>
        `)}
        ${d.if(() => this.state.profile.physical && Object.values(this.state.profile.physical).some(Boolean), d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Physical Description</div>
            <div class="p-4 grid grid-cols-2 gap-2 text-sm">
              ${d.map(() => Object.keys(this.state.profile.physical), x => d.if(() => this.state.profile.physical[x], d.html`
                <div>${x}:</div>
                <div>${d.text(() => this.state.profile.physical[x])}</div>
              `))}
            </div>
          </div>
        `)}
        ${d.if(() => this.state.profile.gallery && this.state.profile.gallery.length, d.html`
          <div>
            <div class="bg-[#FFA1C3] text-white px-4 py-1">Gallery</div>
            <div class="p-4 grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6">
              ${d.map(() => this.state.profile.gallery, x => d.html`
                <img class="h-full aspect-square object-contain bg-[#CBCBCB]" ${{ src: x }}>
              `)}
            </div>
          </div>
        `)}
      </div>
    </div>
  `;
}

export default OCProfile;
