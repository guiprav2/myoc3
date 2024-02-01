class AuthRepository {
  async fetch(url, opt) { return await fetch(`http://localhost:3001/${url}`, opt) }

  async signIn(x) {
    let res = await this.fetch('auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(x),
    });

    return await res.json();
  }

  async signUp(x) {
    let res = await this.fetch('sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(x),
    });

    return await res.json();
  }
}

export default new AuthRepository();
