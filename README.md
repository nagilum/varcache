# varcache

A pure memory based cache for Javascript.

Usage:

```js
var cache = require('libs/varcache/index');
```

Available functions:

## clear

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

XXX

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
