# React + Redux example
Also includes `ReactRouter`, `Immutable` for Universal (isomorphic) application. This is good start for those who want a full solution to work with a RESTful API.
This project is written with ES7 and uses `Babel` to transpile to ES5.

[Redux v1.0.0-rc](https://github.com/gaearon/redux/releases/tag/v1.0.0-rc) is now available on npm. You can view the example for [redux@v1.0.0-rc](https://github.com/quangbuule/redux-example/tree/redux%40v1.0.0-rc) on branch [redux@rc](https://github.com/quangbuule/redux-example/tree/redux%40v1.0.0-rc).

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
Thanks to React and Redux, Server side and client side calls will run almost the same code for rendering.

The differences are in how `api` calls from the client and from the server (running the same code with client) are achieved. Server side calls may send information that is different from client, such as an `accessToken` field (which is received from each request's session), or may send to another api-server.

The `api` methods should therefore be different between server and client.
You can take a look at implementations of the `api` method on the server (/lib/render.js) and client (/src/js/main.js).

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
