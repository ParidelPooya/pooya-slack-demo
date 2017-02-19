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
    require('./routes/root')(app);
    process.on('uncaughtException', function (err) {
        console.error(err.stack);
        console.log("Node NOT Exiting...");
    });
    module.exports = app;
}).call(this);
//# sourceMappingURL=app.js.map