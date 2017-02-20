/**
 * Created by pooyaparidel on 2016-12-09.
 */
(function () {
    var defSettings = {
        port: "5000",
        SLACK_CLIENT_ID: "144193576743.143502641042",
        SLACK_CLIENT_SECRET: "d14645f6a046c023b3e655f7bab38006",
        SLACK_VERIFICATION_TOKEN: ""
    };
    module.exports = {
        read: function (key, ju) {
            var sval = "";
            if (typeof (process.env[key]) == "undefined")
                sval = defSettings[key];
            else
                sval = process.env[key];
            return sval;
        },
        all: function () {
            var keys = Object.keys(defSettings);
            var settings = {};
            var ipos;
            for (ipos = 0; ipos < keys.length; ipos++) {
                if (keys[ipos] !== "pwd" && keys[ipos] !== "mongoUrl" && keys[ipos].indexOf('storees_') !== 0) {
                    settings[keys[ipos]] = module.exports.read(keys[ipos]);
                }
            }
            return settings;
        }
    };
}).call(this);
//# sourceMappingURL=settings.js.map