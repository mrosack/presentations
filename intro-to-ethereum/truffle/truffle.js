module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "dist.js": [
      "bower_components/lodash/dist/lodash.min.js"
    ]
  },
  deploy: [
    "GuestBook"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
