import LoadingDialog from '../components/dialogs/LoadingDialog.js';
import UploadDialog from '../components/dialogs/UploadDialog.js';
import rprofiles from '../repositories/ProfileRepository.js';
import { selectFile, showModal } from '../other/util.js';

class ProfileCtrl {
  state = {
    id: null,
    name: '',
    avatar: '',
    description: '',
    fi: 0,
    fe: 0,
    ocProfiles: [],
    gallery: [],
    collection: [],
    loading: false,
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.id = null;
      this.state.name = '';
      this.state.avatar = null;
      this.state.description = '';
      this.state.fi = 0;
      this.state.fe = 0;
      this.state.ocProfiles = [];
      this.state.gallery = [];
      this.state.collection = [];
      this.state.loading = false;
    },

    load: async x => {
      this.post('profile.reset');
      this.state.id = x;
      if (!x) { return }

      try {
        this.state.loading = true;
        showModal(d.el(LoadingDialog, { done: () => !this.state.loading }));
        Object.assign(this.state, await rprofiles.load(x));
      } finally {
        this.state.loading = false;
      }
    },

    save: async (redirect = true) => {
      let res = await rprofiles.save(this.state.id, {
        name: this.state.name,
        avatar: this.state.avatar,
        description: this.state.description,
        gallery: this.state.gallery,
      });

      if (!this.state.id) { this.state.id = res._id }
      redirect && history.pushState(null, '', `profile?id=${this.state.id}`);
    },

    cancelEdit: () => history.pushState(null, '', `profile?id=${this.state.id}`),

    avatarUpload: async () => {
      let file = await selectFile('image/*');
      let [btn, detail] = await showModal(d.el(UploadDialog, { file }));
      if (btn !== 'ok') { return }
      this.state.avatar = detail;
    },

    createOc: async () => {
      await this.post('profile.save', false);
      history.pushState(null, '', `create-oc?profileId=${this.state.id}&returnTo=/create-profile?id=${this.state.id}`);
    },
  };
}

export default ProfileCtrl;
