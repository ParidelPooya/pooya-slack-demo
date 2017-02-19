/**
 * Created by pooyaparidel on 2016-09-01.
 */
(function () {
    module.exports = function (app, status) {
        app.post('/', function (req, res) {
            let settings = require('../helper/settings');
            let data = {
                response_type: 'in_channel',
                text: '302: Found',
                attachments: [
                    {
                        image_url: 'https://http.cat/302.jpg'
                    }
                ] };
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify(data));
            res.end();
        });
    };
}).call(this);
//# sourceMappingURL=root.js.map