// 2024/11/21 23:38:13

(function() {
    var arrayProto = Array.prototype;
    var objectProto = Object.prototype;
    var nativeJoin = arrayProto.join;
    var nativePush = arrayProto.push;
    var nativeToString = objectProto.toString;
    var nativeFloor = Math.floor;
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
    var rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[".concat(rsAstralRange, "]");
    var rsCombo = "[".concat(rsComboRange, "]");
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")");
    var rsNonAstral = "[^".concat(rsAstralRange, "]");
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[".concat(rsZWJ + rsAstralRange + rsComboRange + rsVarRange, "]"));
    var reOptMod = "".concat(rsModifier, "?");
    var rsOptVar = "[".concat(rsVarRange, "]?");
    var rsOptJoin = "(?:".concat(rsZWJ, "(?:").concat([ rsNonAstral, rsRegional, rsSurrPair ].join("|"), ")").concat(rsOptVar + reOptMod, ")*");
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsNonAstralCombo = "".concat(rsNonAstral).concat(rsCombo, "?");
    var rsSymbol = "(?:".concat([ rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral ].join("|"), ")");
    var reUnicode = RegExp("".concat(rsFitz, "(?=").concat(rsFitz, ")|").concat(rsSymbol + rsSeq), "g");
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
    function isArguments(value) {
        return isObjectLike(value) && getTag(value) == "[object Arguments]";
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
    function isFlattenable(value) {
        return isArray(value) || isArguments(value);
    }
    function baseFlatten(array, depth, predicate, isStrict, result) {
        predicate || (predicate = isFlattenable);
        result || (result = []);
        if (array == null) {
            return result;
        }
        var index = -1, length = array.length;
        while (++index < length) {
            var value = array[index];
            if (predicate(value)) {
                {
                    nativePush.apply(result, value);
                }
            } else {
                result[result.length] = value;
            }
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
    function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
            return [];
        }
        start = start == null ? 0 : start;
        end = end === undefined ? length : end;
        if (start < 0) {
            start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
            end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var index = -1;
        var result = new Array(length);
        while (++index < length) {
            result[index] = array[index + start];
        }
        return result;
    }
    function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined ? length : end;
        return !start && end >= length ? array : slice(array, start, end);
    }
    function hasUnicode(string) {
        return reHasUnicode.test(string);
    }
    function asciiToArray(string) {
        return string.split("");
    }
    function unicodeToArray(string) {
        return string.match(reUnicode) || [];
    }
    function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function filter(array, predicate) {
        var index = -1;
        var resIndex = 0;
        var length = array == null ? 0 : array.length;
        var result = [];
        while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
                result[resIndex++] = value;
            }
        }
        return result;
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
    function flatMap(collection, iteratee) {
        return baseFlatten(map(collection, iteratee));
    }
    function baseToString(value) {
        if (typeof value === "string") {
            return value;
        }
        if (isArray(value)) {
            return "".concat(map(value, baseToString));
        }
        var result = "".concat(value);
        return result === "0" && 1 / value === -INFINITY ? "-0" : result;
    }
    function asciiSize(string) {
        return string.length;
    }
    function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
            ++result;
        }
        return result;
    }
    function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function repeat(string, n) {
        var result = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result;
        }
        do {
            if (n % 2) {
                result += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
                string += string;
            }
        } while (n);
        return result;
    }
    function createPadding(length, chars) {
        chars = chars === undefined ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
            return charsLength ? repeat(chars, length) : chars;
        }
        var result = repeat(chars, Math.ceil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length);
    }
    function padStart(string, length, chars) {
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string || "";
    }
    function createIsNativeType(nativeObject) {
        return function(value) {
            return value != null && value instanceof nativeObject;
        };
    }
    var isPanel = createIsNativeType(Panel);
    var isWindow = createIsNativeType(Window);
    var reScriptFileName = /\.(js|jsx|jsxbin)$/i;
    var isFile = createIsNativeType(File);
    function createPath() {
        return nativeJoin.call(arguments, Folder.fs === "Windows" ? "\\" : "/");
    }
    function newFolder(path) {
        return new Folder(path);
    }
    var isFolder = createIsNativeType(Folder);
    function castFolder(folder) {
        return isFolder(folder) ? folder : newFolder(folder);
    }
    function getFiles(path, mask) {
        var folder = castFolder(path);
        if (!folder.exists) {
            return [];
        }
        return folder.getFiles(mask);
    }
    function eachFiles(folder, iteratee) {
        var resIndex = 0;
        forEach(getFiles(folder), function(unknownFile, index, files) {
            if (isFile(unknownFile)) {
                if (iteratee(unknownFile, resIndex++, files) === false) {
                    return false;
                }
            }
        });
        return folder;
    }
    function binaryToString(binary) {
        var decimalCode = parseInt(binary, 2);
        return String.fromCharCode(decimalCode);
    }
    function decimalToHex(decimal) {
        var hexCode = decimal.toString(16).toUpperCase();
        return "00".substring(hexCode.length) + hexCode;
    }
    function hexToBinary(hex) {
        var binaryCode = parseInt(hex, 16).toString(2);
        return padStart(binaryCode, 8, "0");
    }
    function encodeImageString(data) {
        return map(map(map(data, decimalToHex), hexToBinary), binaryToString).join("");
    }
    function getAppPath() {
        return BridgeTalk.getAppPath("aftereffects");
    }
    function removeFileExt(fileName) {
        return fileName.replace(/\.[^\.]+$/, "");
    }
    function getPlainFileName(file) {
        return removeFileExt(file.displayName);
    }
    function isScriptFile(file) {
        return reScriptFileName.test(file.displayName);
    }
    function mapFiles(folder, iteratee) {
        var result = [];
        eachFiles(folder, function(file, index, files) {
            result[index] = iteratee(file, index, files);
        });
        return result;
    }
    function newSolidImage(size, color) {
        var imageData = [ 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, size[0], 0, 0, 0, size[1], 1, 3, 0, 0, 0, 1, 24, 7, 9, 0, 0, 0, 3, 80, 76, 84, 69, color[0], color[1], color[2], 63, 26, 7, 10, 0, 0, 0, 11, 73, 68, 65, 84, 8, 215, 99, 32, 5, 0, 0, 0, 45, 0, 1, 226, 21, 94, 0, 56, 50, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 0, 56, 50 ];
        return encodeImageString(imageData);
    }
    function trimPathRight(path, length) {
        var pathPartial = path.replace(/(\\\\|\\)/g, "/").split("/");
        return pathPartial.slice(0, -length).join("/");
    }
    (function() {
        var context = this;
        var appPath = getAppPath();
        var supportPath = trimPathRight(appPath, 1);
        var scriptPath = createPath(supportPath, "Scripts");
        var scriptUIPath = createPath(scriptPath, "ScriptUI Panels");
        var SCRIPT_PATHS_DEFAULT = [ scriptPath, scriptUIPath ];
        runScript();
        function runScript() {
            var unknownFiles = flatMap(SCRIPT_PATHS_DEFAULT, function(path) {
                return mapFiles(path, function(file) {
                    return file.alias ? file.resolve() : file;
                });
            });
            var scriptFiles = filter(unknownFiles, isScriptFile);
            var scriptNames = map(scriptFiles, getPlainFileName);
            var container = initMainContainer(context, "");
            container.onResize = function() {
                container.layout.resize();
            };
            container.alignChildren = [ "fill", "fill" ];
            container.margins = 5;
            var lisbox = container.add("listbox", undefined, undefined, {
                multiselect: true
            });
            lisbox.preferredSize = [ 300, 500 ];
            if (isWindow(container)) {
                container.show();
            } else {
                container.layout.layout(true);
            }
            forEach(scriptNames, function(name, index) {
                var item = lisbox.add("item", name);
                var colorValue = reduce(name.split(""), function(acc, cur) {
                    return acc + cur.charCodeAt(0);
                }, 0) % 256;
                item.image = newSolidImage([ 15, 15 ], [ colorValue, 255 - colorValue, colorValue * 2 % 256 ]);
            });
            lisbox.onDoubleClick = function() {
                var selection = this.selection;
                if (isArray(selection)) {
                    var index = selection[0].index;
                    $.evalFile(scriptFiles[index]);
                }
            };
        }
        function initMainContainer(context, title) {
            return isPanel(context) ? context : baseCreatePalette(title);
        }
        function baseCreatePalette(title) {
            return new Window("palette", title, undefined, {
                resizeable: true
            });
        }
    }).call(this);
}).call(this);
