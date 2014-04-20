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

Gets the stored value for the given key in the cache.

Simple call:

```js
var value = cache.get('key');
```

Can be extended to trigger callbacks for both hit and miss.

```js
var value = cache.get(
	'key',
	function (key, data) {
		console.log('Found key: "' + key + '" with value:');
		console.log(data);
	},
	function (key) {
		console.log('No data cached for key: "' + key + '".');
	}
);
```

## hitCount

Returns the number of key-hits recorded, which is how many times data has been
requested from the cache. This requires that the recordHist() function has been
called.

Simple call:

```js
var hits = cache.hitCount();
```

Can be extended to trigger a callback with the number.

```js
cache.hitCount(function (count) {
	console.log('Total hits for keys are: ' + count.toString());
});
```

## hitLog

Returns the log of hits, which returns the entire log for every hit against the
cache. This requires that the recordHist() function has been called.

Simple call:

```js
var hits = cache.hitLog();
```

Can be extended to trigger a callback with the log.

```js
cache.hitLog(function (hits) {
	console.log(hits);
});
```

## keys

Returns all stored keys, which is convenient for management

Simple call:

```js
var keys = cache.keys();
```

Can be extended to trigger a callback with the keys.

```js
cache.keys(function (keys) {
	console.log(keys);
});
```

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
