/**
 * Created by pooyaparidel on 2016-09-01.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
(function () {
    module.exports = function (app) {
        app.post('/', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let data = {
                    response_type: 'in_channel',
                    text: 'Preparing...' };
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify(data));
                res.end();
                let settings = require('../helper/settings');
                let modernRequest = require('../helper/modern-request');
                let modernXmlParser = require("../helper/modern-xml-parser");
                let response_url = req.body.response_url;
                let movieName = req.body.text;
                let url = "http://www.imdb.com/xml/find?xml=1&nr=1&tt=on&q=" + movieName;
                let movieDataXml = yield modernRequest.get(url);
                let movieDataJson = yield modernXmlParser.parse(movieDataXml);
                data = {
                    response_type: 'in_channel',
                    text: 'Search Result for' + movieName,
                    attachments: [] };
                let rec = movieDataJson.IMDbResults.ResultSet[0].ImdbEntity[0];
                let title = rec["_"];
                if (typeof (rec.Description[0]) === "string")
                    title += " " + rec.Description[0];
                data.attachments.push({
                    "color": "#0000ff",
                    "title": title,
                    "title_link": "http://www.imdb.com/title/" + rec["$"]["id"]
                });
                var request = require('request');
                request.post({
                    url: response_url,
                    body: data,
                    json: true
                }, function (error, response, responseBody) {
                });
            });
        });
    };
}).call(this);
//# sourceMappingURL=root.js.map