/**
 * Created by pooyaparidel on 2016-09-01.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    module.exports = function (app) {
        app.post('/', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let data = {
                    response_type: 'in_channel',
                    text: 'Preparing....'
                };
                console.log("msg 0");
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify(data));
                res.end();
                console.log("msg 1");
                let settings = require('../helper/settings');
                let modernRequest = require('../helper/modern-request');
                let modernXmlParser = require("../helper/modern-xml-parser");
                console.log("msg 2");
                let response_url = req.body.response_url;
                let movieName = req.body.text;
                let url = "http://www.omdbapi.com/?s=" + encodeURIComponent(movieName) + "&apikey=f06abf77";
                let movieData = yield modernRequest.get(url);
                let movieDataJson = JSON.parse(movieData);
                try {
                    movieData = yield modernRequest.get(url);
                    movieDataJson = JSON.parse(movieData);
                }
                catch (e) {
                    console.log("error");
                    console.log(e);
                }
                console.log("data");
                console.log(movieDataJson);
                console.log("msg 4");
                data = {
                    replace_original: true,
                    response_type: 'in_channel',
                    attachments: []
                };
                if (movieDataJson.Search && movieDataJson.Search.length !== 0) {
                    movieDataJson.Search.forEach(element => {
                        data.attachments.push({
                            "color": "#0000aa",
                            "title": element.Title + " (" + element.Year + ")",
                            "image_url": element.Poster,
                            "title_link": "http://www.imdb.com/title/" + element.imdbID
                        });
                    });
                }
                else {
                    data.text = "No results found!";
                }
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
