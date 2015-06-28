import keyMirror from 'react/lib/keyMirror';

export default {
  init: '@@INIT',

  Repo: keyMirror({
    getByUsername: null,
    getMore: null
  }),

  User: keyMirror({
    getOneByUsername: null
  })
};
