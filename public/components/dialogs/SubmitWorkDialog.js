import d from '../../other/dominant.js';
import useCtrl from '../../controllers/useCtrl.js';

class SubmitWorkDialog {
  constructor(props) {
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });
    post('submitWork.reset', props.data);
  }

  close(btn, detail) { this.root.returnDetail = detail; this.root.close(btn) }

  render = () => this.root = d.html`
    <dialog class="mx-auto my-0 p-0 w-screen max-w-5xl min-h-screen bg-neutral-100 pb-12">
      <div class="bg-[#2D2829] flex justify-between text-[#FA3973C2] p-4 items-center">
        <div class="flex gap-3 items-center">
          <button class="nf nf-fa-chevron_left"></button>
          <img class="ml-4 opacity-0" src="images/myoc3.png">
        </div>
      </div>
      <div class="max-w-xs mx-auto">
        <div ${{
          class: ['aspect-square bg-white flex justify-center items-center max-w-sm mx-auto mb-4 my-10', () => !this.state.submitWork.data.url && 'cursor-pointer'],
          onClick: () => !this.state.submitWork.data.url && this.post('submitWork.upload'),
        }}>
          ${d.if(() => !this.state.submitWork.data.url, d.html`
            <div class="nf nf-fa-plus font-2xl text-[#FFA1C3]"></div>
          `, d.html`
            <img class="w-full h-full object-cover" ${{ src: () => this.state.submitWork.data.url + '?w=800' }}>
          `)}
        </div>
        <button class="nf nf-fa-trash w-min ml-auto text-[#FFA1C3] block mb-10" ${{ onClick: () => this.post('submitWork.clear') }}></button>
      </div>
      <div class="mx-10 my-8">
        <div class="text-sm text-[#FA3973]">Title</div>
        <input class="w-full bg-transparent border-b border-[#A7A7A7] outline-none py-2" ${{
          value: d.binding({ get: () => this.state.submitWork.data.title, set: x => this.state.submitWork.data.title = x }),
        }}>
      </div>
      <div class="mx-10 my-8">
        <div class="text-sm text-[#FA3973]">Description</div>
        <input class="w-full bg-transparent border-b border-[#A7A7A7] outline-none py-2" ${{
          value: d.binding({ get: () => this.state.submitWork.data.description, set: x => this.state.submitWork.data.description = x }),
        }}>
      </div>
      <div class="mx-10 my-8">
        <div class="text-sm text-[#FA3973]">Tags</div>
        <input class="w-full bg-transparent border-b border-[#A7A7A7] outline-none py-2" ${{
          value: d.binding({ get: () => this.state.submitWork.data.tags, set: x => this.state.submitWork.data.tags = x }),
        }}>
      </div>
      <div class="mx-10 my-8">
        <div class="text-sm text-[#FA3973]">Sexual content? </div>
        <select class="w-full py-2 mt-2 bg-transparent" ${{ onChange: ev => this.state.submitWork.data.sexual = ev.target.value }}>
          <option value="none" ${{ selected: () => this.state.submitWork.data.sexual === 'none' }}>None</option>
          <option value="yes" ${{ selected: () => this.state.submitWork.data.sexual === 'yes' }}>Yes</option>
        </select>
      </div>
      <button class="block py-2 bg-[#FFA1C3] text-white uppercase w-80 mx-auto mt-20" ${{
        onClick: () => this.close('ok', this.state.submitWork.data),
      }}>Submit</button>
    </div>
  `;
}

export default SubmitWorkDialog;
