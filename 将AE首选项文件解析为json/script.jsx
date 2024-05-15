// Raymond Yan (raymondclr@foxmail.com / qq: 1107677019) - 2024/5/14 11:29:10
// 哔哩哔哩：https://space.bilibili.com/634669（无名打字猿）
// 爱发电：https://afdian.net/a/raymondclr

(function () {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeToString = objectProto.toString;
    function has(object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }
    function getTag(value) {
        if (value == null) {
            return value === undefined ? "[object Undefined]" : "[object Null]";
        }
        return nativeToString.call(value);
    }
    function isArray(value) {
        return getTag(value) == "[object Array]";
    }
    function isObjectLike(value) {
        return typeof value === "object" && value !== null;
    }
    function or() {
        var index = -1;
        var length = arguments.length;
        while (++index < length) {
            if (arguments[index]) {
                return true;
            }
        }
        return false;
    }
    function map(array, iteratee) {
        var index = -1;
        var length = array == null ? 0 : array.length;
        var result = new Array(length);
        while (++index < length) {
            result[index] = iteratee(array[index], index, array);
        }
        return result;
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
    function eq(value, other) {
        return or(value === other, value !== value && other !== other);
    }
    function forEach(array, iteratee) {
        var index = -1;
        var length = array.length;
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }
        return array;
    }
    function forOwn(object, iteratee) {
        for (var key in object) {
            if (has(object, key)) {
                if (iteratee(object[key], key, object) === false) {
                    break;
                }
            }
        }
        return object;
    }
    function isDate(value) {
        return isObjectLike(value) && getTag(value) == "[object Date]";
    }
    function isString(value) {
        var type = typeof value;
        return type === "string" || (type === "object" && value != null && !isArray(value) && getTag(value) == "[object String]");
    }
    function partition(array, predicate) {
        return reduce(
            array,
            function (result, value, index) {
                return result[predicate(value, index) ? 0 : 1].push(value), result;
            },
            [[], []]
        );
    }
    function assignValue(object, key, value) {
        var objectValue = object[key];
        if (!(has(object, key) && eq(objectValue, value))) {
            if (value !== 0 || 1 / value === 1 / objectValue) {
                baseAssignValue(object, key, value);
            }
        } else if (value === undefined && !(key in object)) {
            baseAssignValue(object, key, value);
        }
    }
    function baseZipObject(props, values, assignFunc) {
        var index = -1;
        var length = props.length;
        var valsLength = values.length;
        var result = {};
        while (++index < length) {
            var value = index < valsLength ? values[index] : undefined;
            assignFunc(result, props[index], value);
        }
        return result;
    }
    function zipObject(props, values) {
        return baseZipObject(props || [], values || [], assignValue);
    }
    function createIsNativeType(nativeObject) {
        return function (value) {
            return value != null && value instanceof nativeObject;
        };
    }
    var rePrefsKeyName = /"([^"]+?)"/;
    var reSplitPrefsBlock = /^\s*?"([^"]*?)"\s*?=\s*?\s*/gm;
    var reSplitPrefsSection = /^\["([^\]]+)"\][^"]/gm;
    var jsonEscapes = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\v": "\\v",
        '"': '\\"',
        "\\": "\\\\",
    };
    var reEscapedJson = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var reHasEscapedJson = new RegExp(reEscapedJson.source);
    var isFile = createIsNativeType(File);
    function newFile(path) {
        return new File(path);
    }
    function castFile(file) {
        return isFile(file) ? file : newFile(file);
    }
    function readFile(path, encoding) {
        if (encoding === void 0) {
            encoding = "utf-8";
        }
        var file = castFile(path);
        if (!file.exists) {
            return null;
        }
        file.encoding = encoding;
        file.open("r");
        var contents = file.read();
        file.close();
        return contents;
    }
    function concatJson(head, partial, gap, mind, tail) {
        return gap ? head + "\n" + gap + partial.join(",\n" + gap) + "\n" + mind + tail : head + partial.join(",") + tail;
    }
    function concatJsonKey(string) {
        return reHasEscapedJson.test(string) ? '"' + escapeJsonKey(string) + '"' : '"' + string + '"';
    }
    function concatSpaceIndent(n) {
        var indent = "",
            index = -1;
        while (++index < n) {
            indent += " ";
        }
        return indent;
    }
    function escapeJsonKey(string) {
        return string.replace(reEscapedJson, function (matched) {
            var escaped = has(jsonEscapes, matched) ? jsonEscapes[matched] : undefined;
            return isString(escaped) ? escaped : hexEncode(matched);
        });
    }
    function getPrimitiveValue(value) {
        return isDate(value) ? value.toString() : value.valueOf();
    }
    function hexEncode(string) {
        return "\\u" + ("0000" + string.charCodeAt(0).toString(16)).slice(-4);
    }
    function stringify(value, indent) {
        if (indent === void 0) {
            indent = 4;
        }
        return stringifyValue(value, isString(indent) ? indent : concatSpaceIndent(indent), "");
    }
    function stringifyArray(array, indent, gap) {
        var mind = gap;
        gap += indent;
        var partial = [];
        forEach(array, function (value, index) {
            partial[index] = stringifyValue(value, indent, gap);
        });
        return partial.length === 0 ? "[]" : concatJson("[", partial, gap, mind, "]");
    }
    function stringifyObject(object, indent, gap) {
        var mind = gap;
        gap += indent;
        var colon = gap ? ": " : ":";
        var partial = [];
        forOwn(object, function (value, key) {
            partial.push(concatJsonKey(key) + colon + stringifyValue(value, indent, gap));
        });
        return partial.length === 0 ? "{}" : concatJson("{", partial, gap, mind, "}");
    }
    function stringifyValue(value, indent, gap) {
        if (value == null) {
            return "null";
        }
        var primitive = getPrimitiveValue(value);
        switch (typeof primitive) {
            case "string":
                return concatJsonKey(primitive);

            case "number":
                return isFinite(primitive) ? String(primitive) : "null";

            case "boolean":
                return String(primitive);

            case "object":
                return isArray(primitive) ? stringifyArray(primitive, indent, gap) : stringifyObject(primitive, indent, gap);

            case "function":
                return '"' + escapeJsonKey(primitive.toString()) + '"';

            default:
                return "null";
        }
    }
    function extractPrefskeyName(string) {
        var result = "";
        string.replace(rePrefsKeyName, function (match, $1) {
            result = $1;
        });
        return result;
    }
    function isEven(number) {
        return (number & 1) === 0;
    }
    function partitionPrefsPairs(array) {
        array.shift();
        return partition(array, function (value, index) {
            return isEven(index);
        });
    }
    function splitPrefsPairs(string) {
        return string.split(reSplitPrefsBlock);
    }
    function splitPrefsSection(string) {
        return string.split(reSplitPrefsSection);
    }
    function trimPrefsBlankChar(string) {
        return string.replace(/^\t+/gm, "").replace(/^"/gm, "").replace(/\\$/gm, "").replace(/"$/gm, "").replace(/\n/g, "");
    }
    function parsePrefs(path) {
        var splitSection = splitPrefsSection(readFile(path));
        var groupedSection = partitionPrefsPairs(splitSection);
        var section = map(groupedSection[0], extractPrefskeyName);
        var pairs = map(map(groupedSection[1], splitPrefsPairs), function (values) {
            var groupedPairs = partitionPrefsPairs(values);
            var keys = map(groupedPairs[0], extractPrefskeyName);
            return zipObject(keys, map(groupedPairs[1], trimPrefsBlankChar));
        });
        return zipObject(section, pairs);
    }
    var jsonObject = parsePrefs("C:\\Users\\admin\\AppData\\Roaming\\Adobe\\After Effects\\15.1\\Adobe After Effects 15.1 设置.txt");
    alert(stringify(jsonObject));
}).call(this);
