/**
 * Created by pooyaparidel on 2016-09-01.
 */

(function() {

    module.exports = function(app) {

        app.post('/', async function (req, res) {
            let data : any= {
                response_type: 'in_channel', // public to the channel
                text: 'Preparing...'};
            
            console.log("msg 0");
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify(data));
            res.end();

            console.log("msg 1");
            let settings=require('../helper/settings');
            let modernRequest=require('../helper/modern-request');
            let modernXmlParser = require("../helper/modern-xml-parser");
            
            console.log("msg 2");
            let response_url = req.body.response_url;
            let movieName=req.body.text;
            let url="http://www.omdbapi.com/?s=" + encodeURIComponent(movieName) + "&apikey=f06abf77";

            let movieData=await modernRequest.get(url);
            let movieDataJson = JSON.parse(movieData);

            try{
                movieData=await modernRequest.get(url);
                movieDataJson = JSON.parse(movieData);    
            } catch(e){
                console.log("error");
                console.log(e);
            }
            console.log("data");
            console.log(movieDataJson);

            console.log("msg 4");
            data = {
                response_type: 'in_channel', // public to the channel
                attachments:[]};

            let rec=movieDataJson.Search;

            rec.forEach(element => {
                data.attachments.push({
                    "color": "#0000ff",
                    "title": element.Title + "(" + element.Year + ")",
                    "thumb_url": element.Poster,
                    "title_link": "http://www.imdb.com/title/" + element.imdbID
                });
                    
            });

            var request = require('request');

            request.post({
                url: response_url,
                body: data,
                json: true
            }, function (error, response, responseBody) {

            });

        });
    };



}).call(this);

