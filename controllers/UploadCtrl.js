import rupload from '../repositories/UploadRepository.js';

class UploadCtrl {
  state = {
    progress: 0,
    url: null,
    xhr: null,
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.xhr?.abort?.();
      this.state.progress = 0;
      this.state.url = this.state.xhr = null;
    },

    start: async x => {
      this.post('upload.reset');
      let [xhr, res] = rupload.upload(x, y => this.state.progress = Math.max(10, y));
      this.state.xhr = xhr;
      this.state.url = (await res).url;
    },
  };
}

export default UploadCtrl;
