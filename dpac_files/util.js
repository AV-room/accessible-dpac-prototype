

if(!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	};
}	


;(function ($, window, undefined) {

 
	var 
		toUTC
	,	util = function() {
		this.now = this.toUTC(new Date());
	};



	util.prototype.version = '0.0.2';



	util.prototype.sort = function (normalisers, opts) {
		return function (o, feeds) {

			var 
			 feed
			,	toSort = []
			; 

			for (feed in feeds) if (feeds.hasOwnProperty(feed) && normalisers[feeds[feed].type]) {
				normalisers[feeds[feed].type](feeds, feed, toSort);
			}

			opts.cb(toSort.sort(opts.sorter))

		};
	};
	


	util.prototype.createDate = function (str) {
		
		var date = new Date(str)
			, year 
			, month
			, date_ 
			, time
			, hours 
			, minutes
			, seconds
			, strA 
			, months
			;

		if (!date || date == 'Invalid Date' || date == 'NaN') {
			date = new Date(str.replace(' +', 'UTC+'));
		}
		

		if (!date || date == 'Invalid Date' || date == 'NaN') {
			date = new Date(str.replace(/\-/ig, '/').replace('T', ' '));
		} 


		if (!date || date == 'Invalid Date' || date == 'NaN') {
			 
			strA = str.split(' ');
			months = {
				'Jan': 0,
				'Feb': 1,
				'Mar': 2,
				'Apr': 3,
				'May': 4,
				'Jun': 5,
				'Jul': 6,
				'Aug': 7,
				'Sep': 8,
				'Oct': 9,
				'Nov': 10,
				'Dec': 11
			};

			year  = strA[5];
			month = strA[1];
			date_ = strA[2];
			time  = strA[3].split(':');


			hours = time[0] + 11;
			minutes = time[1]
			seconds = time[2]
			
			date = new Date(year, months[month], date_, hours, minutes, seconds);

		}

		return date;

	}



	util.prototype.toUTC = toUTC = function (td) {
		return Date.UTC(
				td.getFullYear()
			, td.getMonth()
			, td.getDate()
			, td.getHours()
			, td.getMinutes()
			, td.getSeconds()
			, td.getMilliseconds()
		);
	};



	util.prototype.timeSince = function (base, now) {

		var
			diff
		, utc
		, o
		;

		utc = toUTC(base);
		now = now || this.now;
		diff = now - utc;

		o = {
			ob: base,
			utc: utc,
			seconds: parseInt(diff/1000, 10),
			minutes: parseInt(diff/1000/60, 10),
			hours: parseInt(diff/1000/60/60, 10),
			days: parseInt(diff/1000/60/60/24, 10)
		}

		return o;

	}; 



	util.prototype.sinceToString = function(since, labels) {

		var 
			result
		, p = function (i) { return (i > 1) ? 's ' : ' '; }
		;

		labels = labels || {}
		labels.p = labels.p || p;
		
		switch (true) {
			case (since.days  > 0): 
				result = since.days + (labels.day || ' day') + labels.p(since.days); 
				break;
			case (since.hours  > 0):
				result = since.hours + (labels.hour || ' hour') + labels.p(since.hours); 
				break;
			case (since.minutes > 0):
			result = since.minutes + (labels.minute || ' minute') + labels.p(since.minutes); 
				break;
			case (since.seconds > 0):
				result = since.seconds + (labels.second || ' second') + labels.p(since.seconds); 
				break;
		};

		return result;

	};



	util.prototype.Formatter = function (templates, ignore) {
		return function (t, ob) {
			var name, re, str = templates[t];
			ignore = ignore || {};
			if (!str) return;
			for (name in ob) if (ob.hasOwnProperty(name) && !ignore[name]) {
				re = new RegExp('{(?=' + name + ')' + name + '(?=})}', 'g');
				str = str.replace(re, ob[name])
			}
			return str.replace(/\{\w+\}/g, '')
		}
	};



	$ = $ || window;
	$.DPAC = $.DPAC || {};
	$.DPAC.Util = new util;



})(null, window);

