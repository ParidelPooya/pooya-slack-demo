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
            let url="http://www.imdb.com/xml/find?xml=1&nr=1&tt=on&q=" + movieName;

            console.log("msg 3");
            let movieDataXml=await modernRequest.get(url);
            let movieDataJson = await modernXmlParser.parse(movieDataXml);

            console.log("msg 4");
            data = {
                response_type: 'in_channel', // public to the channel
                attachments:[]};

            let rec=movieDataJson.IMDbResults.ResultSet[0].ImdbEntity[0];
            let title=rec["_"];
            if(typeof(rec.Description[0])==="string")
                title+=" " + rec.Description[0];

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
    };



}).call(this);

