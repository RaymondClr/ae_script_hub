import * as _ from "soil-ts";
(function () {
    const objDict = _.groupBy(app.effects, function (effectData) {
        return effectData.matchName;
    });
    const result = _.every(["ADBE Fill", "CC Glass"], function (matchName) {
        return _.has(objDict, matchName);
    });
    alert(result);
})();
