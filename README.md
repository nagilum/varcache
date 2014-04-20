# varcache

A pure memory based cache for Javascript.

Usage:

```js
var cache = require('varcache');

// Storing an item in the cache.
cache.set('test', 'Something quite awesome!');

// Getting an item from the cache.
var test = cache.get('test');

// Deleting an item from the cache.
cache.delete('test');

// Storing an item in the cache with expiration and callbacks.
cache.set(
	'test',
	'Semething even more awesome...',
	5000,
	function (key, data) {
		console.log('Just stored "' + key + '" with:');
		console.log(data);
	},
	function (key) {
		console.log('"' + key + '" just expired.');
	}
);
```

This should print this:

```
Something quite awesome!
Just stored "test" with:
Semething even more awesome...

... 5 seconds later ...

"test" just expired.
```

Available functions:

* [clear](#clear)
* [debug](#debug)
* [delete](#delete)
* [get](#get)
* [hitCount](#hitCount)
* [hitLog](#hitLog)
* [keys](#keys)
* [keysCount](#keysCount)
* [missCount](#missCount)
* [missLog](#missLog)
* [recordHits](#recordHits)
* [recordMisses](#recordMisses)
* [set](#set)

## clear

Clears the entire cache hold of entries.

Available parameters:

* callback (function)

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

Available parameters:

* value (boolean)

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

Available parameters:

* key/keys (string/array)
* callback (function)

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

Available parameters:

* key (string)
* callbackHit (function)
* callbackMiss (function)

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

Available parameters:

* callback (function)

Simple call:

```js
var count = cache.hitCount();
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

Available parameters:

* callback (function)

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

Available parameters:

* callback (function)

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

Returns the number of keys stored.

Available parameters:

* callback (function)

Simple call:

```js
var count = cache.keysCount();
```

Can be extended to trigger a callback with the number.

```js
cache.keysCount(function (count) {
	console.log(count);
});
```

## missCount

Returns the number of key-misses recorded, which is how many times data has been
requested without existing in the cache. This requires that the recordMisses()
function has been called.

Available parameters:

* callback (function)

Simple call:

```js
var count = cache.missCount();
```

Can be extended to trigger a callback with the number.

```js
cache.missCount(function (count) {
	console.log('Total misses for keys are: ' + count.toString());
});
```

## missLog

Returns the log of misses, which returns the entire log for every miss against
the cache. This requires that the recordMisses() function has been called.

Available parameters:

* callback (function)

Simple call:

```js
var misses = cache.missLog();
```

Can be extended to trigger a callback with the log.

```js
cache.missLog(function (misses) {
	console.log(misses);
});
```

## recordHits

Enables, or disables, recording of hits in the cache. Default for this is set
to false.

Available parameters:

* value (boolean)

Simple call:

```js
cache.recordHits();
```

Can be extended to specify the boolean value to turn it on or off.

```js
cache.recordHits(false);
```

## recordMisses

Enables, or disables, recording of misses in the cache. Default for this is set
to false.

Available parameters:

* value (boolean)

Simple call:

```js
cache.recordMisses();
```

Can be extended to specify the boolean value to turn it on or off.

```js
cache.recordMisses(false);
```

## set

Creates, or updates, an item in the cache with all the fixins.

Available parameters:

* key (string)
* data (any)
* ttl (int)
* callbackSet (function)
* callbackExpires (function)

Simple call:

```js
cache.set('key', 'value');
```

This stores the "value" by the "key" forever. Can be extended to include how
many milliseconds the value is to be stored in the cache.

```js
cache.set('key', 'value', 5000);
```

This will store the data for 5 seconds. If you set 0, the data is stored
without an expiration. Can also be extended to trigger callbacks when the data
is set and when the data expires.

```js
cache.set(
	'key',
	'value',
	5000,
	function (record) {
		console.log('This is the newly created record, which contains some metadata:');
		console.log(record);
	},
	function (key) {
		console.log('The entry with key: "' + key + '" just expired.');
	}
);
```
