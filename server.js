/**
 * Created by pooya on 2017-02-19.
 */


(function() {
    var app, debug, http, normalizePort, onError, onListening, port, server;

    app = require('./app');

    debug = require('debug')('Slack Demo Server');

    http = require('http');

    var settings=require('./helper/settings');


    /*
     * Normalize a port into a number, string, or false.
     */

    normalizePort = function(val) {
        var port;
        port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    };


    /*
     * Event listener for HTTP server "error" event.
     */

    onError = function(error) {
        var bind;
        if (error.syscall !== 'listen') {
            throw error;
        }
        bind = (typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port);
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                return process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                return process.exit(1);
            default:
                throw error;
        }
    };


    /*
     * Event listener for HTTP server "listening" event.
     */

    onListening = function() {
        var addr, bind;
        addr = server.address();
        bind = (typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port);
        return debug('Listening on ' + bind);
    };


    /*
     * Get port from environment and store in Express.
     */

    port = process.env.PORT || normalizePort(settings.read("port"));

    app.set('port', port);

    server = http.createServer(app);

    server.listen(port);

    server.on('error', onError);

    server.on('listening', onListening);

}).call(this);

