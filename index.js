/**
 * @file
 * varcache, a pure memory based cache for Javascript.
 *
 * @author
 * Stian Hanger <pdnagilum@gmail.com>
 */

'use strict';

var cache        = {},
    debug        = false,
    hitCount     = 0,
    hitLog       = {},
    allKeys      = {},
    missCount    = 0,
    missLog      = {},
    recordHits   = false,
    recordMisses = false;

/**
 * Clears the entire cache hold of entries.
 *
 * @param function callback
 *   (optional) The function to call after the deed.
 */
exports.clear = function(callback) {
  if (debug)
    console.log('varcache: Clearing cache.');

  cache = {};

  if (typeof callback === 'function')
    callback();
}

/**
 * Enables, or disables, debug mode, which logs evething it does to the console.
 *
 * @param bool value
 *   (optional) The new state of debugging. Defaults to true.
 */
exports.debug = function(value) {
  if (typeof value === 'undefined')
    value = true;

  else if (typeof value !== 'boolean')
    throw 'Value needs to be of boolean type.';

  debug = value;

  if (value)
    console.log('varcache: Turned on debug.');
}

/**
 * Deletes an entry by-key or several items if an array of keys are passed.
 *
 * @param string/array keys
 *   A single key or array of keys.
 * @param function callback
 *   (optional) Function to call when the operation is completed with the keys
 *              as parameter.
 */
exports.delete = function (keys, callback) {
  if (debug)
    console.log('varcache: Attempting to delete keys: ' + keys);

  // If the key is a singular string, remove the item from cache.
  if (typeof keys === 'string') {
    var keyHit = allKeys[keys];

    if (typeof keyHit !== 'undefined') {
      delete cache[keys];
      delete allKeys[keys];

      if (typeof callback === 'function')
        callback(keys);

      if (recordHits)
        addKeyHit(keys);
    }
    else {
      if (recordMisses)
        addKeyMiss(keys);
    }
  }

  // If the keys possed are an array, cycle and remove items from cache.
  else if (keys instanceof Array) {
    keys.forEach(function (key) {
      if (typeof key === 'string') {
        var keyHit = allKeys[key];

        if (typeof keyHit !== 'undefined') {
          delete cache[key];
          delete allKeys[key];

          if (typeof callback === 'function')
            callback(key);

          if (recordHits)
            addKeyHit(keys);
        }
        else {
          if (recordMisses)
            addKeyMiss(keys);
        }
      }
      else {
        throw 'The given key is not a string.';
      }
    });
  }

  // If keys passed are neither a string nor an array of string, kick the
  // bucket.
  else {
    throw 'The keys, or key, passed must be a string or an array of string.';
  }
}

/**
 * Gets the stored value for the given key in the cache.
 *
 * @param string key
 *   The key to fetch data from.
 * @param function callbackHit
 *   (optional) Function to call with the key and data.
 * @param function callbackMiss
 *   (optional) Function to call if the data is not present in cache, with the
 *              key as parameter.
 *
 * @return object
 *   The stored data, if present, otherwise null.
 */
exports.get = function (key, callbackHit, callbackMiss) {
  if (typeof key !== 'string')
    throw '"key" must be string.';

  if (debug)
    console.log('varcache: Attempting to fetch cached item by key: "' + key + '".');

  // Fetch the record, if present, from the cache.
  var data   = null,
      miss   = false,
      record = cache[key];

  // Analyse the record for passed expiration and pass it along.
  if (typeof record !== 'undefined') {
    if (record.expires !== 0 &&
        record.expires <= dateTimeNow()) {
      exports.delete(key);
      miss = true;
    }
    else {
      data = record.data;

      if (typeof callbackHit === 'function')
        callbackHit(key, data);

      if (recordHits)
        addKeyHit(key);
    }
  }

  // Record the miss, if set.
  if (miss) {
    if (typeof callbackMiss === 'function')
      callbackMiss(key);

    if (recordMisses)
      addKeyMiss(key);
  }

  return data;
}

/**
 * Returns the number of key-hits recorded.
 *
 * @param function callback
 *   (optional) Function to call with the hitCount parameter.
 *
 * @return int
 *   The number of hits.
 */
exports.hitCount = function (callback) {
  if (debug)
    console.log('varcache: Returning hitCount.');

  if (typeof callback === 'function')
    callback(hitCount);

  return hitCount;
}

/**
 * Returns the log of hits.
 *
 * @param function callback
 *   (optional) Function to call with the hit-record parameter.
 *
 * @return JSON
 *   The list of hits.
 */
exports.hitLog = function (callback) {
  if (debug)
    console.log('varcache: Returning hitLog.');

  if (typeof callback === 'function')
    callback(hitLog);

  return hitLog;
}

/**
 * Returns all stored keys.
 *
 * @param function callback
 *   (optional) The function to call with the keys.
 *
 * @return JSON
 *   A set of keys.
 */
exports.keys = function (callback) {
  if (debug)
    console.log('varcache: Returning keys.');

  if (typeof callback === 'function')
    callback(allKeys);

  return allKeys;
}

/**
 * Returns the number of keys stored.
 *
 * @param function callback
 *   (optional) The function to call with the number.
 *
 * @return int
 *   The number of keys.
 */
exports.keysCount = function (callback) {
  if (debug)
    console.log('varcache: Returning number of keys.');

  var count = 0;

  for (var key in allKeys)
    count++;

  if (typeof callback === 'function')
    callback(count);

  return count;
}

/**
 * Returns the number of key-misses recorded.
 *
 * @param function callback
 *   (optional) Function to call with the missCount parameter.
 *
 * @return int
 *   The number of misses.
 */
exports.missCount = function (callback) {
  if (debug)
    console.log('varcache: Returning missCount.');

  if (typeof callback === 'function')
    callback(missCount);

  return missCount;
}

/**
 * Returns the log of misses.
 *
 * @param function callback
 *   (optional) Function to call with the miss-record parameter.
 *
 * @return JSON
 *   The list of misses.
 */
exports.missLog = function (callback) {
  if (debug)
    console.log('varcache: Returning missLog.');

  if (typeof callback === 'function')
    callback(missLog);

  return missLog;
}

/**
 * Enables, or disables, recording of hits in the cache.
 *
 * @param bool value
 *   (optional) The new state of recording. Defaults to true.
 */
exports.recordHits = function (value) {
  if (typeof value === 'undefined')
    value = true;

  else if (typeof value !== 'boolean')
    throw 'Value needs to be of boolean type.';

  recordHits = value;

  if (debug)
    console.log('varcache: Turned ' + (value ? 'on' : 'off') + ' hit-recording.');
}

/**
 * Enables, or disables, recording of misses in the cache.
 *
 * @param bool value
 *   (optional) The new state of recording. Defaults to true.
 */
exports.recordMisses = function (value) {
  if (typeof value === 'undefined')
    value = true;

  else if (typeof value !== 'boolean')
    throw 'Value needs to be of boolean type.';

  recordMisses = value;

  if (debug)
    console.log('varcache: Turned ' + (value ? 'on' : 'off') + ' miss-recording.');
}

/**
 * Creates, or updates, an item in the cache with all the fixins.
 *
 * @param string key
 *   The key to store the data under.
 * @param object data
 *   The data to store.
 * @param int ttl
 *   (optional) The amount of ms the item is to stay in the cache. Defaults to
 *              0.
 * @param function callbackSet
 *   (optional) Function to be called after the item is created and set in
 *              memory. Parameter for this function is the newly created record.
 * @param function callbackExpires
 *   (optional) Function to be called when the items expire date is passed and
 *              the item is removed from memory. Parameter for this function is
 *              the key if the item.
 */
exports.set = function (key, data, ttl, callbackSet, callbackExpires) {
  if (typeof key !== 'string')
    throw '"key" must be string.';

  if (typeof data === 'undefined')
    throw '"data" cannot be undefined.';

  if (typeof ttl === 'undefined')
    ttl = 0;

  if (typeof ttl !== 'number')
    throw '"ttl" must be a number.';

  if (debug)
    console.log('varcache: Caching "' + key + '"' + (typeof ttl !== 'undefined' ? (ttl === 0 ? ' forever.' : ' for ' + ttl.toString() + ' milliseconds.') : ''));

  // If an old record with the same key exist, we must first clear the timeout.
  var record = cache[key],
      keyHit = allKeys[key];

  // Remove the old timer, if present.
  if (record && record.timeout !== null)
    clearTimeout(record.timeout);

  // Calculate the new TTL.
  var expires = (ttl > 0 ? ttl + dateTimeNow() : 0);

  // Setup the new record to be saved.
  record = {
    key       : key,
    data      : data,
    ttl       : ttl,
    expires   : expires,
    expiresOn : (expires > 0 ? new Date(expires) : null),
    timeout   : null
  };

  // Add the key, if not present, and update if.
  if (typeof keyHit === 'undefined')
    allKeys[key] = {
      key: key,
      created: new Date(),
      changed: new Date()
    };
  else
    allKeys[key].changed = new Date;

  // Add the item to the cache.
  cache[key] = record;

  // Create a timeout to delete the item from cache when it expires.
  if (expires > 0) {
    record.timeout = setTimeout(function () {
      exports.delete(key);

      if (typeof callbackExpires === 'function')
        callbackExpires(key);
    }, ttl);
  }

  // Trigger the callback, if given.
  if (typeof callbackSet === 'function')
    callbackSet(record);
}

/**
 * Add a hit to the global hit-array.
 *
 * @param string key
 *   The key to be added.
 */
function addKeyHit(key) {
  if (debug)
    console.log('varcache: Recorded hit on key: "' + key + '".');

  hitCount++;

  if (typeof hitLog[key] === 'undefined')
    hitLog[key] = [];

  hitLog[key].push(new Date());
}

/**
 * Adds a miss to the global miss-array.
 *
 * @param string key
 *   The key to be added.
 */
function addKeyMiss(key) {
  if (debug)
    console.log('varcache: Recorded miss on key: "' + key + '".');

  missCount++;

  if (typeof missLog[key] === 'undefined')
    missLog[key] = [];

  missLog[key].push(new Date());
}

/**
 * Returns the current time in seconds.
 *
 * @return int
 *   Seconds since epoch.
 */
function dateTimeNow() {
  return (new Date).getTime();
}
