/**
 * Created by pooyaparidel on 2016-12-09.
 */

(function() {
    let request=require('request');

    function doRequest(url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }


module.exports = {
    get:doRequest
}


}).call(this);
