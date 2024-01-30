import AuthCtrl from './AuthCtrl.js';
import ProfileCtrl from './ProfileCtrl.js';
import d from '../other/dominant.js';
import debounce from 'https://cdn.skypack.dev/debounce';

let state = {};

let sections = {
  auth: new AuthCtrl(),
  profile: new ProfileCtrl(post),
};

for (let [k, v] of Object.entries(sections)) { state[k] = v.state }

let printSeparator = debounce(() => console.log('---'), 200);

async function post(action, ...args) {
  console.log(`${action}${args.length ? ':' : ''}`, ...args.map(x => {
    if (typeof x === 'string') {
      if (x.includes('\n')) { return x.split('\n')[0].slice(0, 100) + '...' }
      return x.length > 100 ? x.slice(0, 100) + '...' : x;
    }
    return x;
  }));
  printSeparator();
  let [section, name] = action.split('.');
  let ret = sections[section].actions[name](...args);
  if (ret?.then) { await ret }
  d.update();
}

function useCtrl() { return [state, post] }

export default useCtrl;
