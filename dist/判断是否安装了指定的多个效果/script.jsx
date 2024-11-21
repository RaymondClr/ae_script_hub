// 2024/11/21 23:18:45

(function() {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function has(object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }
    function reduce(array, iteratee, initialValue) {
        var length = array.length;
        if (length === 0 && initialValue === undefined) {
            return undefined;
        }
        var accumulator = initialValue === undefined ? array[0] : initialValue;
        var startIndex = initialValue === undefined ? 0 : -1;
        var currentIndex = startIndex;
        while (++currentIndex < length) {
            accumulator = iteratee(accumulator, array[currentIndex], currentIndex, array);
        }
        return accumulator;
    }
    function baseAssignValue(object, key, value) {
        object[key] = value;
    }
    function every(array, predicate) {
        var index = -1;
        var length = array.length;
        while (++index < length) {
            if (!predicate(array[index], index, array)) {
                return false;
            }
        }
        return true;
    }
    function groupBy(array, iteratee) {
        return reduce(array, function(result, value) {
            var key = iteratee(value).toString();
            if (has(result, key)) {
                result[key].push(value);
            } else {
                baseAssignValue(result, key, [ value ]);
            }
            return result;
        }, {});
    }
    (function() {
        var objDict = groupBy(app.effects, function(effectData) {
            return effectData.matchName;
        });
        var result = every([ "ADBE Fill", "CC Glass" ], function(matchName) {
            return has(objDict, matchName);
        });
        alert(result);
    })();
}).call(this);
