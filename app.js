let NeDB = require('nedb');
let express = require('express');
let helmet = require('helmet');
let jwt = require('jsonwebtoken');
let makeService = require('feathers-nedb');
let rateLimit = require('express-rate-limit');

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) { throw new Error('Missing JWT_SECRET') }

let app = express();
Number(process.env.TRUST_PROXY || 0) && app.enable('trust proxy');

app.use(rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW || 60000),
  max: Number(process.env.RATE_LIMIT_MAX_REQS || 1000),
}));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.static('public'));

let UserModel = new NeDB({ filename: './data/users.db', autoload: true });
let UserService = makeService({ Model: UserModel, multi: true, whitelist: ['$exists', '$regex', '$size', '$elemMatch'] });
UserService.update('1', { name: 'test', password: '1234' }, { nedb: { upsert: true } }).catch(err => console.error(err));

app.use(async (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth) { return next() }
  let { id } = await jwt.verify(auth, jwtSecret);
  req.user = await UserService.get(id);
  delete req.user.password;
  next();
});

app.post('/auth', async (req, res) => {
  let matches = await UserService.find({ query: { name: req.body.name, password: req.body.password } });

  if (!matches.length) {
    res.status(401);
    res.send({ error: 'Bad username or password' });
    return;
  }

  let [user] = matches;
  let token = jwt.sign({ id: user._id }, jwtSecret);
  delete user.password;
  res.send({ user, token });
});

let FeedModel = new NeDB({ filename: './data/feed.db', autoload: true });
let FeedService = makeService({ Model: FeedModel, multi: true, whitelist: ['$exists', '$regex', '$size', '$elemMatch'] });

app.get('/feed', async (req, res) => res.json(await FeedService.find()));

let LikeModel = new NeDB({ filename: './data/likes.db', autoload: true });
let LikeService = makeService({ Model: LikeModel, multi: true, whitelist: ['$exists', '$regex', '$size', '$elemMatch'] });

app.get('/likes/by/:id', async (req, res) => res.json(await LikeService.find({ query: { author: req.params.id } })));
app.post('/likes', async (req, res) => res.json(await LikeService.create(req.body)));
app.delete('/likes/:id', async (req, res) => res.json(await LikeService.remove(req.params.id)));

let OCProfileModel = new NeDB({ filename: './data/ocs-profiles.db', autoload: true });
let OCProfileService = makeService({ Model: OCProfileModel, multi: true, whitelist: ['$exists', '$regex', '$size', '$elemMatch'] });

app.get('/oc-profiles', async (req, res) => {
  let ocs = await OCProfileService.find({ query: req.query });
  res.json(ocs);
});

app.get('/oc-profiles/:id', async (req, res) => {
  let oc = await OCProfileService.get(req.params.id);
  res.json(oc);
});

app.post('/oc-profiles', async (req, res) => {
  //if (!req.user) { req.status(401); req.send({ error: 'Authorization required' }) }
  let created = await OCProfileService.create(req.body);

  for (let x of created.gallery || []) {
    await FeedService.create({ imgUrl: x.url, pageUrl: `/oc-profile?id=${created._id}` });
  }

  res.json(created);
});

app.put('/oc-profiles/:id', async (req, res) => {
  //if (!req.user) { req.status(401); req.send({ error: 'Authorization required' }) }
  let old = await OCProfileService.get(req.params.id);
  let updated = await OCProfileService.update(req.params.id, req.body, { nedb: { upsert: true } });
  let oldGallery = old?.gallery || [];
  let updatedGallery = updated.gallery || [];

  for (let x of oldGallery) {
    if (updatedGallery.find(y => y.url === x.url)) { continue }
    await FeedService.remove(null, { query: { imgUrl: x.url } });
  }

  for (let x of updatedGallery) {
    if (oldGallery.find(y => y.url === x.url)) { continue }
    await FeedService.create({ imgUrl: x.url, pageUrl: `/oc-profile?id=${req.params.id}` });
  }

  res.json(updated);
});

app.delete('/oc-profiles/:id', async (req, res) => {
  //if (!req.user) { req.status(401); req.send({ error: 'Authorization required' }) }
  let deleted = await OCProfileService.remove(req.params.id);

  for (let x of deleted.gallery || []) {
    await FeedService.remove(null, { query: { imgUrl: x.url } });
  }

  res.json(deleted);
});

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

let port = process.env.PORT || 3000;
app.listen(port).on('listening', () => {
  console.log('Server started on port:', port);
});
