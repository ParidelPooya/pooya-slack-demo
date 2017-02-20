/**
 * Created by pooyaparidel on 2016-09-01.
 */

(function() {

    module.exports = function (app, status) {

        let request = require('request');
        let settings = require('./helper/settings');

        app.get('/slack', function (req, res) {
            if (!req.query.code) { // access denied
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
                    // Get an auth token
                    let token = JSON.parse(body).access_token;

                    // Get the team domain name to redirect to the team URL after auth
                    request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (JSON.parse(body).error == 'missing_scope') {
                                res.send('HTTP Status Cats has been added to your team!');
                            } else {
                                let team = JSON.parse(body).team.domain;
                                res.redirect('http://' + team + '.slack.com');
                            }
                        }
                    });
                }
            });

        });


    }

}).call(this);

