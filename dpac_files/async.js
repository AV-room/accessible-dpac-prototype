

var Async = function (options) {

	var self = this;

	options = options || {};
	this.subscriptions = options.events || this.subscriptions;
	this.locations  = options.locations  || this.locations;
	this.timeout  = options.timeout  || this.timeout;
	this.callbackPrefix = options.callbackPrefix || 'fn';

	this.notify = options.trigger ? function () { 
																		options.trigger.apply(self, arguments); 
																	}
																: this.notify;

	this.subscribe = options.on   ? function () { 
																		options.on.apply(self, arguments); 
																	}
																: this.subscribe;

	this.ajax = options.ajax ? 	function () { 
																return options.ajax.apply(self, arguments); 
															} 
													 : 	this.ajax;

	this.callback = options.callback ? 	function () { 
																return options.callback.apply(self, arguments); 
															} 
													 : 	this.callback;

	

	if (this.subscriptions['data:retrieved']) {
		this.subscribe('data:retrieved', function () {
			options.events['data:retrieved'].apply(self, arguments);
		});
	}

	if (this.subscriptions['data:processed']) {
		this.subscribe('data:processed', function () {
			options.events['data:processed'].apply(self, arguments)
		});
	}

	return this; 

};

Async.prototype.version = '0.1';

/**
 * Map for jsonp callback functions
 */
Async.prototype.callback = function (name) {};

/**
 * Hooks for external library event handling
 * Uses jQuery signatures
 */
Async.prototype.notify = function () {};
Async.prototype.subscribe = function () {};
Async.prototype.subscriptions = {};

/**
 * Hooks for external library ajax
 * Uses jQuery signatures
 */
Async.prototype.ajax = function (url, options) {}

/**
 * Container for location objects
 * object {url, opts}
 */
Async.prototype.locations = [];

/**
 * Container for Data
 */
Async.prototype.data = {};

/**
 * Adds a location to the locations array
 *
 * @param loc, object {url, opts}, the location to add
 * 
 * @return Async instance
 */
Async.prototype.addLocation = function (label, loc) {
	loc.options = loc.options || {};
	this.locations[label] = loc;
	return this;
};

/**s
 * Adds locations to the locations array
 *
 * @param locs, array of locations objects (see addLocation(loc))
 * 
 * @return Async instance
 */
Async.prototype.addLocations = function (locs) {
	for (var loc in locs) if (locs.hasOwnProperty(loc)) {
		this.addLocation(loc, locs[loc]);
	}
	return this;
};

/**
 * Retrieves data from locations
 *
 * @param type, string. Can be either 'string' or 
 * 'array' defaults to string 
*/
Async.prototype.retrieve = function () {

	 var
    	self = this
    , locs = self.locations
    , safeLoc = false
    , isJsonP = false
    , safeLoc
    , counter = function (key, value, ob) {

        self.responded++;
        
        self.data[key] = {
        	data: (ob.pre) ? ob.pre(value) : value,
        	type: ob.type
        };
        
        if ((self.responded >= self.called) && !self.complete) {
          self.complete = true;
          self.notify('data:retrieved', self.data);
        }

      }
    , oldFn
    , oldCallback
    ;

	self.complete = false;

  for (var loc in locs) if (locs.hasOwnProperty(loc)) {

    self.called++;

    locs[loc].options = locs[loc].options || {};
		oldFn  = null;
		oldCallback = null;

    /**
     * Curry success function to hook in 
     * counter function
     */
    if (locs[loc].options.success) {
    	oldFn = locs[loc].options.success;
		} 
    
    locs[loc].options.onComplete = 

    locs[loc].options.success = (function (loc, old) {
    	return function (o, s) {
    		var type = locs[loc].options.type;
    		counter(loc, o, locs[loc]);
				if (old && type && type !== 'jsonp') old.apply(null, arguments);
			};
		}) (loc, oldFn);
		
		// Mootools
		if (!window.jQuery) locs[loc].options.complete = locs[loc].options.success;
	
 		/**
     * Set jsonp callback function
     *
     *	If the name of the feed is an integer (i.e. an id). 'fn' is prepended
     *	to the id. so the json callback will not fail if it is an objects member
     *
     */
		if (locs[loc].options.callback) {
			safeLoc = (+loc == loc) ? self.callbackPrefix + loc : loc; 
			locs[loc].options.callback.ob[locs[loc].options.callback.name] = locs[loc].options.callback.ob[locs[loc].options.callback.name] || {};
    	locs[loc].options.callback.ob[locs[loc].options.callback.name][safeLoc] = locs[loc].options.success;
    };

   	self.ajax(locs[loc].url, locs[loc].options);

  }

  setTimeout(function () {
    if (self.complete) return;
    self.data.error = 'Timed out';
    self.notify('data:retrieved', self.data);
    self.done();
  }, 4000);

};

/**
 * Counters
 * called, the number of locations contacted
 * responded, the number of locations responding to contact
 * completed, has the most recent request completed
 */
Async.prototype.called = 0;
Async.prototype.responded = 0;
Async.prototype.complete = true;

/**
 * How many milliseconds to wait before timing out the process
 */
Async.prototype.timeout = 7000;

/**
 * tidy up and reset counters
 */
Async.prototype.done = function () {
	this.called = 0;
	this.responded = 0;
	this.data = {};
	this.complete = true;
}
