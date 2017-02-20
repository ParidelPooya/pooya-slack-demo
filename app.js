/**
 * Created by pooyaparidel on 2016-09-01.
 */
(function () {
    var compression = require('compression');
    var express = require('express');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    var settings = require('./helper/settings');
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./routes/root')(app);
    require('./routes/slack')(app);
    process.on('uncaughtException', function (err) {
        console.error(err.stack);
        console.log("Node NOT Exiting...");
    });
    module.exports = app;
}).call(this);
//# sourceMappingURL=app.js.map