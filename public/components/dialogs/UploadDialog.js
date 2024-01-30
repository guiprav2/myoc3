import d from '../../other/dominant.js';
import useCtrl from '../../controllers/useCtrl.js';

class UploadDialog {
  constructor(props) {
    this.props = props;
    let [state, post] = useCtrl();
    Object.assign(this, { state, post });
    post('upload.start', this.file);
  }

  get file() { return this.props.file }
  onAttach = () => this.fileUrl = URL.createObjectURL(this.file);
  onDetach = () => URL.revokeObjectURL(this.fileUrl);
  close = (btn, detail) => { this.root.returnDetail = detail; this.root.close(btn) };

  render = () => this.root = d.html`
    <dialog class="flex flex-col p-0 rounded text-sm text-white bg-[#262626] shadow-xl" ${{ onAttach: this.onAttach, onDetach: this.onDetach }}>
      <form method="dialog">
        <div class="border-b border-neutral-900">
          <div class="px-3 py-2 flex items-center gap-3">Image Upload</div>
        </div>
        <div class="p-3">
          <img class="w-full rounded" ${{ src: () => this.fileUrl }}>
          <div class="h-2 bg-black/50 rounded mt-1 overflow-hidden">
            <div class="h-2 bg-green-500 rounded" ${{ style: { width: () => this.state.upload.progress + '%' } }}></div>
          </div>
        </div>
        <div class="border-neutral-900 border-t px-3 py-2 flex gap-2">
          <button type="submit" value="ok" ${{
            class: ['px-3 py-1 bg-[#4f46e5] rounded flex-1', () => !this.state.upload.url && 'opacity-50'],
            disabled: () => !this.state.upload.url,
            onClick: () => this.close('ok', this.state.upload.url.replace('guiprav.com', 'imgix.net')),
          }}>OK</button>
          <button class="px-3 py-1 rounded flex-1 bg-[#2b2d31]" value="cancel" ${{
            onClick: () => this.post('upload.reset'),
          }}>Cancel</button>
        </div>
      </form>
    </dialog>
  `;
}

export default UploadDialog;
