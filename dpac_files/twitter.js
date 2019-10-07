
/*! based on https://gist.github.com/4158125 by @robdbo */
;(function (window, undefined) {


  var
      twitter
    ,	util = DPAC.Util
    , $
    ;




  twitter = function (formatter) {
    this.version = '0.0.1'
    this.formatter = formatter;
  };




  twitter.prototype.parse = function (ob) {

    var count = 0,
      i, type, eTAr, tLen, oLen = ob.text.length, map = [],
      meta, tweet, text = ob.text,
      entities = ob.entities;

    for (type in entities) if (entities.hasOwnProperty(type)) {
      eTAr = entities[type];
      count = eTAr.length;
      for (i = 0; i < count; i++) map.push({
        type: type,
        loc: eTAr[i].indices[0],
        ent: eTAr[i]
      })
    }

    map.sort(function (a, b) {
      return a.loc - b.loc
    });
    text = text.split('');

    for (i = map.length - 1; i > -1; i--) if (map[i]) {
      meta = map[i];
      if (meta.ent.indices[0] < oLen) {
        tLen = meta.ent.indices[1] - meta.ent.indices[0];
        tweet = this.formatter(meta.type, meta.ent);
        text.splice(meta.loc, tLen, tweet)
      }
    }

    return text.join('').trim();

  };




  twitter.prototype.tweet = function (ob) {

    var resTxt = '';

    if (ob.retweeted_status && ob.text) {
      ob.text = ob.text.split(':')[0];
      resTxt = this.parse(ob) + ': ' + this.parse(ob.retweeted_status);
    } else {
      resTxt = this.parse(ob);
    }

    return resTxt;

  }




	twitter.prototype.tweeter = function (tweets, label, items, cb, units) {

		var text = ''
		,	i = -1
		, time
		, timeSince = util.timeSince
		, sinceToString = util.sinceToString
		, createDate = util.createDate
		;

		tweets = tweets[label].data;

		while (tweets[++i]) {

			var
				utc
			, since
			, originaltime = false
			, createdAt  = (tweets[i].retweeted_status && tweets[i].retweeted_status.created_at)
					? tweets[i].retweeted_status.created_at
					: tweets[i].created_at
			;

			if (tweets[i].retweeted_status && tweets[i].retweeted_status.created_at)  {
				originaltime = timeSince(createDate(tweets[i].retweeted_status.created_at));
			}


			since = util.timeSince.call(util, createDate(createdAt))
			utc = since.utc;

			text += (tweets[i]) ? this.tweet(tweets[i])  : '';

			items.push({
				'utc': utc,
				'text': this.tweet(tweets[i]),
				'since': util.sinceToString.call(util, (originaltime ? originaltime : since), units),
        'username': this.formatter('profile', {screen_name: tweets[i].user.screen_name}),
				'name': tweets[i].user.name,
				'type': 'twitter'
			});

		}

		if (cb) cb.call(null, tweets, label, items);

	};




	$ = window.jQuery || window;
	$.DPAC = $.DPAC || {};
	$.DPAC.Twitter = twitter;


}) (window);

