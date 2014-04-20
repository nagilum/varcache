# varcache

A pure memory based cache for Javascript.

Usage:

```js
var cache = require('libs/varcache/index');
```

Available functions:

## clear

Clears the entire cache hold of entries.

Simple call:

```js
cache.clear();
```

Can be extended to trigger a callback after the items are cleared.

```js
cache.clear(function () {
	console.log('Cache is not cleared.');
});
```

## debug

Enables, or disables, debug mode, which logs evething it does to the console.

Simple call:

```js
cache.debug();
```

Can be extended to specify the boolean value to turn it on or off.

```js
cache.debug(false);
```

## delete

XXX

## get

XXX

## hitCount

XXX

## hitLog

XXX

## keys

XXX

## keysCount

XXX

## missCount

XXX

## missLog

XXX

## recordHits

XXX

## recordMisses

XXX

## set

XXX
