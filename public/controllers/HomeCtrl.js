import rfeed from '../repositories/FeedRepository.js';

class HomeCtrl {
  state = {
    feed: [],
    likes: [],
  };

  constructor(post) { this.post = post }

  actions = {
    reset: () => {
      this.state.feed = [];
      this.state.likes = [];
    },

    load: async () => {
      this.post('home.reset');
      this.state.feed = await rfeed.load();
      this.post('home.loadLikes');
    },

    loadLikes: async () => this.state.likes = await rfeed.loadLikes(1),

    toggleLike: async x => {
      let y = this.state.likes.find(y => y.imgUrl === x.imgUrl);
      if (y) { console.log('disliking:', y.imgUrl); await rfeed.dislike(y) } else { console.log('liking:', x.imgUrl); await rfeed.like('1', x) }
      this.post('home.loadLikes');
    },
  };
}

export default HomeCtrl;
