/**
 * Created by pooyaparidel on 2016-09-01.
 */
(function () {
    module.exports = function (app, status) {
        let request = require('request');
        let settings = require('../helper/settings');
        app.get('/slack', function (req, res) {
            if (!req.query.code) {
                res.redirect('http://www.girliemac.com/slack-httpstatuscats/');
                return;
            }
            var data = {
                form: {
                    client_id: settings.read("SLACK_CLIENT_ID"),
                    client_secret: settings.read("SLACK_CLIENT_SECRET"),
                    code: req.query.code
                }
            };
            request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.redirect('https://paridelpooya.github.io/pooya-slack-demo/success.html');
                }
            });
        });
    };
}).call(this);
//# sourceMappingURL=slack.js.map