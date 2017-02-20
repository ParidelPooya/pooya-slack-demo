/**
 * Created by pooyaparidel on 2016-12-09.
 */
(function () {
    let parseString = require('xml2js').parseString;
    function parse(xml) {
        return new Promise(function (resolve, reject) {
            parseString(xml, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    module.exports = {
        parse: parse
    };
}).call(this);
//# sourceMappingURL=modern-xml-parser.js.map