var TEMPLATES = {

	/*
	*	Used for twitter
	*/
	twitter: {
    'profile': '<a href="http://twitter.com/{screen_name}" target="_blank">@{screen_name}</a>',
		'urls': ' <a href="{url}" title="{expanded_url}" target="_blank">{display_url}</a> ',
		'user_mentions': ' <a href="http://twitter.com/{screen_name}" title="http://twitter.com/{screen_name}" target="_blank">@{screen_name}</a> ',
		'hashtags': ' <a href="https://twitter.com/search?q={text}" title="https://twitter.com/search?q={text}" target="_blank">#{text}</a> ',
		'media': ' <a href="{url}" title="{expanded_url}" target="_blank">{display_url}</a> '
	},

	/*
	*	Used for facebook
	*/
	facebook: {
    'profile': '<a href="http://facebook.com/{user_id}" title="http://facebook.com/{user_id}" target="_blank">{name}</a> ',
		'urls': ' <a href="{url}" title="{expanded_url}" target="_blank">{display_url}</a> ',
		'more': ' ... <a href="http://facebook.com/{user_id}/posts/{post_id}" title="view on facebook" target="_blank">more</a> '
	},


	/*
	*	Used for generating the final list
	*/
	combined: {
		'item':  '<li><img alt="Social Media Image" src="//applications.dpac.tas.gov.au/_assets/_common/images/{image}.png"/>'
					 + '{username}'
					 + '<p>{since} ago</p>'
					 + '<pre>{text}</pre></li>',
		'ul'  :  '<ul>{list}</ul>'
	}

};

