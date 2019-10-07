
;(function (window, undefined){

	var
		util =  DPAC.Util,
		twitter = new $.DPAC.Twitter(new util.Formatter(TEMPLATES.twitter, {
			'indices': true,
			'id_str': true,
			'name': true,
			'large': true,
			'medium': true,
			'small': true,
			'thumb': true,
			'h': true,
			'resize': true,
			'w': true,
			'source_status_id': true,
			'source_status_id_str': true,
			'media_url_https': true,
			'sizes': true,
			'type': true
		}))
	,	facebook = new $.DPAC.Facebook(new util.Formatter(TEMPLATES.facebook))

	, fb_root = '//applications.dpac.tas.gov.au/_assets/feeds/fb'
	, twit_root = '//applications.dpac.tas.gov.au/_assets/feeds/twitter'
	, options = {
			'dataType': 'jsonp',
			'callback': { ob: DPAC, name: 'cb' }
		}

	, async = new Async({
			locations: {
	 
				'AustraliaDayTasmania': {
					options: options,
					url: fb_root + '/AustraliaDayTasmania.json',
					type: 'facebook'
				},

				'AustraliaDayInTheOfficeTasmania': {
					options: options,
					url: fb_root + '/AustraliaDayInTheOfficeTasmania.json',
					type: 'facebook'
				},

				'macdonaldprize':  {
					options: options,
					url: fb_root + '/macdonaldprize.json',
					type: 'facebook'
				},

				'centenaryofanzac':  {
					options: options,
					url: fb_root + '/centenaryofanzac.json',
					type: 'facebook'
				},

				'tasalert':  {
					options: options,
					url: fb_root + '/tasalert.json',
					type: 'facebook'
				},
				
				'tashonourroll':  {
					options: options,
					url: fb_root + '/tashonourroll.json',
					type: 'facebook'
				},

				'TasClimateChangeOffice':  {
					options: options,
					url: fb_root + '/TasClimateChangeOffice.json',
					type: 'facebook'
				},

				'TasBushFires':  {
					url: twit_root +'/TasBushFires.json',
					options: options,
					type: 'twitter'
				},

				'nywtas':  {
					url: twit_root +'/nywtas.json',
					options: options,
					type: 'twitter'
				}
			},

			on: function (type, handle) { $(this).on(type, handle);	return this; },
			trigger: function (type, data) { $(this).trigger(type, data); return this; },
			ajax: function (url, options) { return $.ajax(url, options); return this; }

		})
	;



	$(async).on('data:retrieved', util.sort({

			facebook: function (feeds, feed, toSort) {
				facebook.poster.apply(facebook, arguments);
			},

			twitter: function () {
				twitter.tweeter.apply(twitter, arguments);
			}

		},
		{

			sorter:	function(a, b) {
				return b.utc - a.utc;
			},

			cb: function (data, cb) {

				var
					formatter = new util.Formatter(TEMPLATES.combined)
				,	text = ''
				,	j = 20
				, i = 0
				;

				for (; i < j ; i++) {

					if (data[i] && data[i].since) {
						data[i].image = (data[i].type == 'fb') ? 'f_logo' : 'twitter';
						text += formatter('item', data[i]);
					} else if (data[i] && !data[i].since) {
						j++;
					}

				}

				document.getElementById('activityFeed').innerHTML = formatter('ul', {list: text});

			}

		}
	));

	$(function () { async.retrieve(); });

}) (window);
