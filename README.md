# React + Redux example
Also includes `ReactRouter`, `Immutable` for Universal (isomorphic) application. This is good start for those who want a full solution to work with a RESTful API.
This project is written with ES7 and uses `Babel` to transpile to ES5.


##Installation
```
npm install
```

##Run
```
npm run dev
```

##How it works
###API
Thanks to React and Redux, Server side and client side will run almost the same code for rendering.

The differences are how `api` calls from client and from server (running the same code with client) are acheived. Server side calls may send some more information that is different from client, such as an `accessToken` field (which is received from each request's session), or may send to another api-server.

The `api` methods should be therefore be different between server and client.
You can take a look at implementations of the `api` method on the server (/server/render.js) and client (/src/js/main.js).

###Why Immutable?

Data changing over time can cause some unpredictable errors. Immutable makes sure the referenced objects won't have their data changed over time. If you want to change the data, you must reference it to another object. For example:

```js
handleStarButtonClick() {
  const repo = this.state.repo; // Assume we use Immutable for state.repo
  this.setState({
    repo: repo.set('starred', true)
  });
}
```

##TODO
- Improve english.
- Rewrite README.md
- Add inline-style.
- Prevent first loading when having initial state.
- Loading indicator.
