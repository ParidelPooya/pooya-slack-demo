/**
 * Created by pooyaparidel on 2016-09-01.
 */

(function() {

    module.exports = function(app,status) {

        app.get('/', function (req, res) {
            var settings=require('../helper/settings');

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify({a:1}));
            res.end();
        });
    };

}).call(this);

