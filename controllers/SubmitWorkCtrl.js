import UploadDialog from '../components/dialogs/UploadDialog.js';
import { showModal, selectFile } from '../other/util.js';

class SubmitWorkCtrl {
  state = {
    data: { cover: null, title: '', description: '', tags: '', sexual: 'none' },
  };

  constructor(post) { this.post = post }

  actions = {
    reset: data => {
      this.data = { ...data || { cover: null, title: '', description: '', tags: '', sexual: 'none' } };
    },

    uploadCover: async () => {
      let file = await selectFile('image/*');
      let [btn, detail] = await showModal(d.el(UploadDialog, { file }));
      if (btn !== 'ok') { return }
      this.state.data.cover = detail;
    },

    clearCover: () => this.state.data.cover = null,
  };
}

export default SubmitWorkCtrl;
