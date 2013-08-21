var staticPath = './';
var cachePath = './_cache/';
module.exports = {
    port: 4000,
    staticPath : staticPath,
    cachePath : cachePath,
    lib : {
        jq : staticPath + 'vendor/jquery/1.10.2/jquery.js',
        jquery : staticPath + 'vendor/jquery/1.10.2/jquery.js',
        backbone : staticPath + 'vendor/backbone/1.0.0/backbone.js'
    }
}