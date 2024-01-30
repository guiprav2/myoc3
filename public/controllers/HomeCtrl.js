import rfeed from '../repositories/FeedRepository.js';

class HomeCtrl {
  state = {
    currentTab: 'recommended',
    list: [],
    likes: [],
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.currentTab = 'recommended';
      this.state.list = [];
      this.state.likes = [];
    },

    load: async () => {
      switch (this.state.currentTab) {
        case 'recommended': this.state.list = await rfeed.load(); break;
        case 'collection': this.state.list = await rfeed.loadLikes('1'); break;
      }

      this.post('home.loadLikes');
    },

    loadLikes: async () => this.state.likes = await rfeed.loadLikes('1'),

    toggleLike: async x => {
      let y = this.state.likes.find(y => y.imgUrl === x.imgUrl);
      if (y) { console.log('disliking:', y.imgUrl); await rfeed.dislike(y) } else { console.log('liking:', x.imgUrl); await rfeed.like('1', x) }
      this.post('home.loadLikes');
    },

    changeTab: x => {
      this.state.currentTab = x;
      this.post('home.load');
    },
  };
}

export default HomeCtrl;
