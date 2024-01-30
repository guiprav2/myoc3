class ProfileRepository {
  async fetch(url, opt) { return await fetch(`https://protohub.guiprav.com/myoc/${url}`, opt) }

  async load(x) {
    let res = await this.fetch(`profiles?_id=${x}`);
    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return (await res.json())[0];
  }

  async save(x, data) {
    let res = await this.fetch(x ? `profiles?_id=${x}` : 'profiles', {
      method: x ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }
}

export default new ProfileRepository();
