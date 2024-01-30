class FeedRepository {
  async fetch(url, opt) { return await fetch(`http://localhost:3001/${url}`, opt) }

  async load() {
    let res = await this.fetch('feed');
    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }

  async loadLikes(x) {
    let res = await this.fetch(`likes/by/${x}`);
    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }

  async like(author, x) {
    let res = await this.fetch('likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, imgUrl: x.imgUrl, pageUrl: x.pageUrl }),
    });

    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }

  async dislike(x) {
    let res = await this.fetch(`likes/${x._id}`, { method: 'DELETE' });
    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }
}

export default new FeedRepository();
