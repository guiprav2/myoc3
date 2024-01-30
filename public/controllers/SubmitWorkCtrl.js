import UploadDialog from '../components/dialogs/UploadDialog.js';
import { showModal, selectFile } from '../other/util.js';

class SubmitWorkCtrl {
  state = {
    data: { url: null, title: '', description: '', tags: '', sexual: 'none' },
  };

  constructor(post) { this.post = post }

  actions = {
    reset: data => {
      this.data = { ...data || { url: null, title: '', description: '', tags: '', sexual: 'none' } };
    },

    upload: async () => {
      let file = await selectFile('image/*');
      let [btn, detail] = await showModal(d.el(UploadDialog, { file }));
      if (btn !== 'ok') { return }
      this.state.data.url = detail;
    },

    clear: () => this.state.data.url = null,
  };
}

export default SubmitWorkCtrl;
