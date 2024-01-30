import rprofiles from '../repositories/ProfileRepository.js';

class ProfileCtrl {
  state = {
    id: null,
    name: '',
    avatar: '',
    story: null,
    bio: null,
    physical: null,
    gallery: null,
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.id = null;
      this.state.name = '';
      this.state.avatar = null;
      this.state.story = '';
      this.state.bio = this.state.physical = this.state.gallery = null;
    },

    load: async x => {
      this.post('profile.reset');
      this.state.id = x;
      Object.assign(this.state, await rprofiles.load(x));
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
  };
}

export default ProfileCtrl;
