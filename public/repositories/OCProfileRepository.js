class OCProfileRepository {
  async fetch(url, opt) { return await fetch(`http://localhost:3001/${url}`, opt) }

  async load(x) {
    let res = await this.fetch(`oc-profiles/${x}`);
    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }

  async save(x, data) {
    let res = await this.fetch(x ? `oc-profiles/${x}` : 'oc-profiles', {
      method: x ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) { throw new Error(`Fetch error: ${res.status}`) }
    return await res.json();
  }
}

export default new OCProfileRepository();
