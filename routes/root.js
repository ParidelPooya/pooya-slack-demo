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
                    "response_type": "ephemeral",
                    "replace_original": true,
                    "delete_original": true,
                    "text": "Preparing..."
                };

                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify(data));
                res.end();

                let settings = require('../helper/settings');
                let modernRequest = require('../helper/modern-request');
                let modernXmlParser = require("../helper/modern-xml-parser");

                data = {
                    "response_type": "ephemeral",
                    "replace_original": true,
                    "delete_original": true,
                    "text": ""
                };
                
                request.post({
                    url: response_url,
                    body: data,
                    json: true
                }, function (error, response, responseBody) {
                });
                
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
                }
                
                var request = require('request');
                                
                data = {
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
