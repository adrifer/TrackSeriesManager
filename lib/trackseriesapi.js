var request = require('request');

function getToken(trackseries, callback)
{
	if(trackseries.token){
		callback(trackseries.token);
	}else{
		var options = {
			url: 'http://trackseriesapi.azurewebsites.net/v1/Account/Login',
			method: 'POST',
			form: {
				username: trackseries.username,
				password: trackseries.password,
				grant_type: "password"
			}
		}
		request(options, function(error, response, body){
			var data = JSON.parse(body);
			callback(data.access_token)
		});
	}
}

function getSeries(token, callback){
	var options = {
		url: 'http://trackseriesapi.azurewebsites.net/v1/Follow/Series',
		headers: {
			'Authorization': 'bearer ' + token
		}
	}

    request(options, function(error, response, body){
    	var data = JSON.parse(body);
    	callback(data);
    });
}

function getSeriesInfo(id, callback){
	var options = {
		url: 'http://trackseriesapi.azurewebsites.net/v1/Series/' + id + '/All'
	}

    request(options, function(error, response, body){
    	var data = JSON.parse(body);
    	callback(data);
    });
}

exports.getToken = getToken;
exports.getSeries = getSeries;
exports.getSeriesInfo = getSeriesInfo;