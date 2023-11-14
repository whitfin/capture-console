# capture-console

[![Build Status](https://img.shields.io/github/actions/workflow/status/whitfin/capture-console/ci.yml?branch=main)](https://github.com/whitfin/capture-console/actions) [![Published Version](https://img.shields.io/npm/v/capture-console.svg)](https://npmjs.com/package/capture-console) [![Published Downloads](https://img.shields.io/npm/dt/capture-console)](https://npmjs.com/package/capture-console)

capture-console is a small Node.js library built to help when capturing log output via `process.stdout` and `process.stderr`. The main use case is unit testing (which is why I built it), but there's no reason it can't be used in production code paths.

### Installation

capture-console lives on npm, so just install it via the command line and you're good to go.

```
$ npm install --save-dev capture-console
```

### Usage

There are a whole bunch of ways to use `capture-console`, mainly due to scoping, with the two easiest defined below. Depending on your use case you might be pushed more towards one than the other, but in general you can just choose your preference.

#### Scoped Captures

The easiest way to use `capture-console` is with scoping; this is when the output of a provided function is captured.

Note that this form assumes synchronous execution - async stuff will require manual hookups (below).

```javascript
const capcon = require('capture-console');

let stderr = capcon.captureStderr(() => {
  // whatever is done in here has stderr captured,
  // the return value is a string containing stderr
});

let stdout = capcon.captureStdout(() => {
  // whatever is done in here has stdout captured,
  // the return value is a string containing stdout
});

let stdio = capcon.captureStdio(() => {
  // whatever is done in here has both stdout and stderr captured,
  // the return value is an object with 'stderr' and 'stdout' keys
});
```

#### Manual Captures

There are also ways to manually stop and start a capture context, by passing a process stream to watch and a callback to fire on each message.

```javascript
const capcon = require('capture-console');

// our buffer
let output = '';

// the first parameter here is the stream to capture, and the
// second argument is the function receiving the output
capcon.startCapture(process.stdout, stdout => {
  output += stdout;
});

// whatever is done here has stdout captured - but note
// that `output` is updated throughout execution

capcon.stopCapture(process.stdout);

// anything logged here is no longer captured
```

### Intercepting

You should be aware that all `capture` functions will still pass the values through to the main stdio `write()` functions, so logging will still go to your standard IO devices.

If this is not desirable, you can use the `intercept` functions. These functions are literally `s/capture/intercept` when compared to those shown above, and the only difference is that calls aren't forwarded through to the base implementation.
