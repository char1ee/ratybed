var http = require('http');
var fs = require('fs');
var uglify = require('uglify-js');
var config = require('./config');

function combo(jslist, callback) {
	var lib = config.lib;
	var s = '';
	for (var i = 0, l = jslist.length; i < l; ++i) {
		s += fs.readFileSync(lib[jslist[i]]) + ';\n\n';
	}
	callback(s);
}
function minjs(jscode) {
	var ret = uglify.minify(jscode, {
		fromString: true
	});
	return ret.code;
}
function debugDo(jslist, callback) {
	console.log('from debug');
	combo(jslist, function (s) {
		callback(s);
	});
}
function writeCache(path, string, callback) {
	fs.writeFileSync(path, string);
	callback();
}
var app;
app = http.createServer(function (req, res) {
	var url = req.url.slice(1);
	var vendorPath = (config.staticPath + url).split('?')[0];
	var cachePath = (config.cachePath + url).split('?')[0];
	var jslist = url.split('.')[0].split('-');
	if (url.indexOf('?debug') > -1) {
		debugDo(jslist, function (s) {
			res.end(s);
		});
	} else {
		fs.exists(cachePath, function (exists) {
			if (exists) {
				console.log('from cache');
				res.end(fs.readFileSync(cachePath));
			} else {
				combo(jslist, function (s) {
					var minCode = minjs(s);
					writeCache(cachePath, minCode, function () {
						console.log('from uglify');
						res.end(minCode);
					});
				});
			}
		});
	}

}).listen(config.port);
