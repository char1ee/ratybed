var staticPath = './public/';
module.exports = {
	port: 4000,
	staticPath : staticPath,
	lib : {
		jq : staticPath + 'vendor/jquery/1.10.2/jquery.js',
		jquery : staticPath + 'vendor/jquery/1.10.2/jquery.js',
		backbone : staticPath + 'vendor/backbone/1.0.0/backbone.js'
	}
}