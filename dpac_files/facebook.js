
/*! based on https://gist.github.com/4158125 by @robdbo */
;(function (window, undefined) {


  var
      Facebook
    ,	util = DPAC.Util
    , $
    ;




  Facebook = function (formatter) {
    this.version = '0.0.1'
    this.formatter = formatter;
  };




	Facebook.prototype.poster = function (feeds, feed, toSort) {

		var
			data
		, dataOb = feeds[feed].data
		,	text
		, re = /http[^\s]*/g
		, urls
		, len
		, chop
		, index
		, createDate = util.createDate

		, i = 0
		,	j = 0
		, dataLen
    , ids
		;

		rawFeedOb = dataOb.feed;

		if (!rawFeedOb) return;

		data = rawFeedOb.data;
 		dataLen = data.length || 0;

		for (i = 0 ; i < dataLen ; i++) {

			if (data[i].message) {

				chop = 140;
				index = data[i].message.indexOf('http://');

				if (data[i].message.length > chop) {
          ids = (""+data[i].id).split('_');
          ids = {
            user_id: ids[0],
            post_id: ids[1]
          }
					chop = data[i].message.indexOf(' ', chop);
					text = data[i].message.slice(0, chop);
				} else {
					text = data[i].message;
          ids = null;
				}

				urls = text.match(re)

				if (urls) {
					len = urls.length;
					for (j = 0 ; j < len ; j++ ) {
						text = text.replace(urls[j], "<a href=" + urls[j] + ">" + urls[j] + "</a>");
					}
				}

        if (ids) text = text + this.formatter('more', ids);

				toSort.push({
					utc: util.toUTC(createDate(data[i].created_time)),
					since: util.sinceToString(util.timeSince(createDate(data[i].created_time))),
					text: text,
					text_full: data[i].message,
					username: this.formatter('profile', {username: dataOb['user'].username, name: dataOb['user'].name, user_id: dataOb['user'].id}),
					type: 'fb'
				});

			}

		}

	};


	$ = window.jQuery || window;
	$.DPAC = $.DPAC || {};
	$.DPAC.Facebook = Facebook;


}) (window);

