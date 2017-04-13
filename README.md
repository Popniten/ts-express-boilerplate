# Typescript boilerplate

A small boilerplate of a minimal typescript express application with automatic client and server compilation (separate), live reload and automatic testing.

Keywords: Typescript, gulp, nodejs, express, handlebars, sass, livereload, mocha, chai.

## Instructions

### Dependencies (maybe)

```bash
npm install -g nodemon typescript ts-node gulp-cli
```

Install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) in Google Chrome for automatic browser reload.

### Application only

```bash
# Install.
npm install

# Start server and watch for changes.
gulp watch

# Run test suite.
npm test
```

## Quirks and workarounds

To get rid of annoying TSlint errors in test files, add `"tslint.exclude": "**/test/**/*.ts"` to your user settings in VS Code.

If application crashes and port is in use when trying to restart, run:

```bash
ps -ax | grep node
```

The output will show something like:

```bash
6316 ?        Sl     0:00 node dist/index.js
```

Find the row with the node command to start your application and note the process number, then run:

```bash
kill -9 6316
```
