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

Deletes an entry by-key or several items if an array of keys are passed.

Simple call:

```js
cache.delete('test-key-1');
```

Or with an array of keys:

```js
cache.delete([ 'test-key-2', 'test-key-3' ]);
```

Can be extended to trigger a callback for each key which is deleted.

```js
cache.delete('test-key-1', function (key) {
	console.log('Just deleted key: "' + key + '".');
});
```

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
