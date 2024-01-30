import LoadingDialog from '../components/dialogs/LoadingDialog.js';
import UploadDialog from '../components/dialogs/UploadDialog.js';
import rprofiles from '../repositories/ProfileRepository.js';
import { selectFile, showModal } from '../other/util.js';

class ProfileCtrl {
  state = {
    id: null,
    name: '',
    avatar: '',
    story: null,
    bio: null,
    physical: null,
    gallery: null,
    loading: false,
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.id = null;
      this.state.name = '';
      this.state.avatar = null;
      this.state.story = '';
      this.state.bio = this.state.physical = this.state.gallery = null;
      this.state.loading = false;
    },

    load: async x => {
      this.post('profile.reset');
      this.state.id = x;

      try {
        this.state.loading = true;
        showModal(d.el(LoadingDialog, { done: () => !this.state.loading }));
        Object.assign(this.state, await rprofiles.load(x));
      } finally {
        this.state.loading = false;
      }
    },

    save: async () => {
      let res = await rprofiles.save(this.state.id, {
        name: this.state.name,
        avatar: this.state.avatar,
        story: this.state.story,
        bio: this.state.bio,
        physical: this.state.physical,
        gallery: this.state.gallery,
      });

      if (!this.state.id) { this.state.id = res._id }
      history.pushState(null, '', `oc-profile?id=${this.state.id}`);
    },

    cancelEdit: () => history.pushState(null, '', `oc-profile?id=${this.state.id}`),

    createBio: () => {
      this.state.bio = {
        'Age': '',
        'Place of birth': '',
      };
    },

    createPhysical: () => {
      this.state.physical = {
        'Species': '',
        'Eye color': '',
      };
    },

    createGallery: () => this.state.gallery = [],

    avatarUpload: async () => {
      let file = await selectFile('image/*');
      let [btn, detail] = await showModal(d.el(UploadDialog, { file }));
      if (btn !== 'ok') { return }
      this.state.avatar = detail.replace('guiprav.com', 'imgix.net');
    },

    galleryUpload: async () => {
      let file = await selectFile('image/*');
      let [btn, detail] = await showModal(d.el(UploadDialog, { file }));
      if (btn !== 'ok') { return }
      this.state.gallery ??= [];
      this.state.gallery.push(detail.replace('guiprav.com', 'imgix.net'));
    },
  };
}

export default ProfileCtrl;
