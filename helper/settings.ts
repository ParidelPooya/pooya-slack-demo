/**
 * Created by pooyaparidel on 2016-12-09.
 */

(function() {

var defSettings={
    port:"3000"

};

module.exports = {
    read:function(key:string,ju:string){

        var sval="";
        if(typeof(process.env[key])=="undefined")
            sval=defSettings[key];
        else
            sval=process.env[key];

        return sval;
    },
    all:function(){
        var keys=Object.keys(defSettings);

        var settings={};

        var ipos;
        for(ipos=0;ipos<keys.length;ipos++){
            if(keys[ipos]!=="pwd" &&  keys[ipos]!=="mongoUrl" && keys[ipos].indexOf('storees_')!==0){
                settings[keys[ipos]] = module.exports.read(keys[ipos]);
            }
        }

        return settings;
    }
}


}).call(this);
