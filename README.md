# React + Redux example
Also includes `ReactRouter`, `Immutable` for Universal (isomorphic) application. This is good start for who want full solution to work with RESTful API.
This project is written with ES7 and use `Babel` to transpile to ES5.


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
Thanks to React and Redux, Server side and client side run almost the same code for rendering.

The difference is how to do `api` calls from client and from server (running the same code with client). Server side may send some more information different from client, such as `accessToken` field (which is get from each request's session), or send to another api-server.

So the `api` method should be different between server and client.
You can take a look at implementations of `api` method on server (/lib/render.js) and client (/src/js/main.js).

###Why Immutable?

Data change overtime can cause some unpredictable errors. Immutable make sure the referenced objects won't have their's data changed overtime. If you want to change the data, you must reference it to another object.

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
