// Raymond Yan (raymondclr@foxmail.com / qq: 1107677019) - 2024/11/21 20:05:19
// 哔哩哔哩：https://space.bilibili.com/634669（无名打字猿）
// 爱发电：https://afdian.net/a/raymondclr

(function() {
    "use strict";
    (function() {
        var nativeParseInt = parseInt;
        var NAN = 0 / 0;
        var INFINITY = 1 / 0;
        var MAX_ARRAY_LENGTH = 4294967295;
        var MAX_INTEGER = 1.7976931348623157e308;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var reTrim = /^\s+|\s+$/g;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsOctal = /^0o[0-7]+$/i;
        function isObject(value) {
            if (value == null) {
                return false;
            }
            var type = typeof value;
            return type === "object" || type === "function";
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
        function toNumber(value) {
            if (typeof value === "number") {
                return value;
            }
            if (isObject(value)) {
                var other = typeof value.valueOf === "function" ? value.valueOf() : value;
                value = isObject(other) ? "".concat(other) : other;
            }
            if (typeof value !== "string") {
                return value === 0 ? value : +value;
            }
            value = value.replace(reTrim, "");
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? nativeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toFinite(value) {
            if (!value) {
                return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
                var sign = value < 0 ? -1 : 1;
                return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
        }
        function toInteger(value) {
            var result = toFinite(value);
            var remainder = result % 1;
            return remainder ? result - remainder : result;
        }
        function chunk(array, size) {
            if (size === void 0) {
                size = 1;
            }
            size = Math.max(toInteger(size), 0);
            var length = array == null ? 0 : array.length;
            if (!length || size < 1) {
                return [];
            }
            var index = 0;
            var resIndex = 0;
            var result = new Array(Math.ceil(length / size));
            while (index < length) {
                result[resIndex++] = slice(array, index, index += size);
            }
            return result;
        }
        function clamp(number, lower, upper) {
            number = +number;
            lower = +lower;
            upper = +upper;
            lower = lower === lower ? lower : 0;
            upper = upper === upper ? upper : 0;
            if (number === number) {
                number = number <= upper ? number : upper;
                number = number >= lower ? number : lower;
            }
            return number;
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
        function times(n, iteratee) {
            if (n < 1 || n > MAX_SAFE_INTEGER) {
                return [];
            }
            var index = -1;
            var length = Math.min(n, MAX_ARRAY_LENGTH);
            var result = new Array(length);
            while (++index < length) {
                result[index] = iteratee(index);
            }
            index = MAX_ARRAY_LENGTH;
            n -= MAX_ARRAY_LENGTH;
            while (++index < n) {
                iteratee(index);
            }
            return result;
        }
        var palette = new Window("palette", undefined, undefined, {
            resizeable: true
        });
        palette.orientation = "row";
        var buttons = times(20, function(x) {
            return palette.add("button", [ 0, 0, 50, 50 ], String(x));
        });
        palette.show();
        function autoResize(elements, margins, spacing) {
            var numItems = elements.length;
            if (numItems == 0) {
                return false;
            }
            var itemMaxWidth = Math.max.apply(Math, map(elements, function(item) {
                return item.size.width;
            })) + spacing;
            var itemMaxHeigh = Math.max.apply(Math, map(elements, function(item) {
                return item.size.height;
            })) + spacing;
            palette.onResize = function() {
                var countMaxItems = Math.floor((this.size.width - margins[2] + spacing) / itemMaxWidth);
                var clamped = clamp(countMaxItems, 1, numItems);
                var splitedItems = chunk(elements, clamped);
                forEach(splitedItems, function(items, rows) {
                    forEach(items, function(item, columns) {
                        item.location = [ margins[0] + itemMaxWidth * columns, margins[1] + rows * itemMaxHeigh ];
                    });
                });
                var countSplited = splitedItems.length;
                this.size.height = countSplited * itemMaxHeigh + margins[3];
            };
        }
        autoResize(buttons, palette.margins, palette.spacing);
    }).call(this);
})();
