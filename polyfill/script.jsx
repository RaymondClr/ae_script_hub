// 此函数由LoYoi提交，欢迎访问我的官网，https://www.loyoi.cn
// 这个代码是旧版本浏览器中模拟新的 JavaScript API 或语言特性的技术
// 脚本是es3 标准的js，一些新的js特性没有，所以这个代码就是模拟一些js新的特性

// [1,2,3].includes(2) // 结果： true
if (!Array.prototype.includes) {
  /**确定数组是否包括某个元素，并根据情况返回true或false。 */
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var len = this.length >>> 0; // 确保长度是一个非负整数
    if (len === 0) {
      return false;
    }

    var startIndex = parseInt(fromIndex, 10); // 明确地转换fromIndex为整数，指定十进制
    if (isNaN(startIndex)) {
      startIndex = 0;
    }
    if (startIndex < 0) {
      startIndex = Math.max(len + startIndex, 0); // 处理负的fromIndex
    }

    for (var i = startIndex; i < len; i++) { // 开始遍历数组
      // 既然是自定义的includes，避免使用hasOwnProperty可以增加一些性能
      if (this[i] === searchElement) {
        return true;
      }
    }

    return false;
  };
}



if (!Array.prototype.every) {
  /**确定数组的所有成员是否满足指定的测试。 */
  Array.prototype.every = function (callback, thisArg) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.every called on null or undefined")
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var T = arguments.length > 1 ? thisArg : void (0);
    var k = 0;
    while (k < len) {
      if (k in O) {
        kValue = O[k];
        var testResult = callback.call(T, kValue, k, O);
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback, thisArg) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.filter called on null or undefined")
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var res = [];
    var T = arguments.length > 1 ? thisArg : void (0);
    for (var i = 0; i < len; i += 1) {
      if (i in t) {
        var val = t[i];
        if (callback.call(T, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.indexOf called on null or undefined")
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.forEach called on null or undefined")
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var T = arguments.length > 1 ? thisArg : void (0);
    for (var k = 0; k < len; k += 1) {
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
    }
  };
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    if (arg === void (0) || arg === null) {
      return false;
    }
    return arg.__class__ === "Array";
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.map called on null or undefined")
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var T = arguments.length > 1 ? thisArg : void (0);
    var A = new Array(len);
    for (var k = 0; k < len; k += 1) {
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
    }
    return A;
  };
}

if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.lastIndexOf called on null or undefined")
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      } else {
        if (n != 0 && n != Infinity && n != -Infinity) {
          n = n > 0 || -1 * Math.floor(Math.abs(n));
        }
      }
    }
    for (var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValue) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.reduce called on null or undefined")
    }
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var k = 0;
    if (arguments.length > 1) {
      value = initialValue;
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError("Reduce of empty array with no initial value")
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  }
}

if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function (callback, initialValue) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.reduceRight called on null or undefined")
    }
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var k = len - 1;
    if (arguments.length > 1) {
      value = initialValue;
    } else {
      while (k >= 0 && !(k in t)) {
        k--;
      }
      if (k < 0) {
        throw new TypeError("Reduce of empty array with no initial value")
      }
      value = t[k--];
    }
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}

if (!Object.create) {
  Object.create = function () {
    function Temp() {

    }
    var hasOwn = Object.prototype.hasOwnProperty;
    return function (O) {
      if (Object(O) !== O && O !== null) {
        throw TypeError("Object prototype may only be an Object or null")
      }
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null;
      if (arguments.length > 1) {
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            var descriptor = Properties[prop];
            if (Object(descriptor) !== descriptor) {
              throw TypeError(prop + "must be an object")
            }
            if ("get" in descriptor || "set" in descriptor) {
              throw new TypeError("getters & setters can not be defined on this javascript engine")
            }
            if ("value" in descriptor) {
              obj[prop] = Properties[prop];
            }
          }
        }
      }
      return obj;
    };
  }();
}

if (!Object.defineProperties) {
  Object.defineProperties = function (object, props) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function convertToDescriptor(desc) {
      if (Object(desc) !== desc) {
        throw new TypeError("Descriptor can only be an Object.")
      }
      var d = {};
      if (hasProperty(desc, "enumerable")) {
        d.enumerable = !(!desc.enumerable);
      }
      if (hasProperty(desc, "configurable")) {
        d.configurable = !(!desc.configurable);
      }
      if (hasProperty(desc, "value")) {
        d.value = desc.value;
      }
      if (hasProperty(desc, "writable")) {
        d.writable = !(!desc.writable);
      }
      if (hasProperty(desc, "get")) {
        throw new TypeError("getters & setters can not be defined on this javascript engine")
      }
      if (hasProperty(desc, "set")) {
        throw new TypeError("getters & setters can not be defined on this javascript engine")
      }
      return d;
    }
    if (Object(object) !== object) {
      throw new TypeError("Object.defineProperties can only be called on Objects.")
    }
    if (Object(props) !== props) {
      throw new TypeError("Properties can only be an Object.")
    }
    var properties = Object(props);
    for (var propName in properties) {
      if (hasOwnProperty.call(properties, propName)) {
        var descr = convertToDescriptor(properties[propName]);
        object[propName] = descr.value;
      }
    }
    return object;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function (callback, thisArg) {
    if (this === void (0) || this === null) {
      throw new TypeError("Array.prototype.some called on null or undefined")
    }
    if (callback.__class__ !== "Function") {
      throw new TypeError(callback + " is not a function")
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var T = arguments.length > 1 ? thisArg : void (0);
    for (var i = 0; i < len; i += 1) {
      if (i in t && callback.call(T, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}

if (!Object.defineProperty) {
  Object.defineProperty = function defineProperty(object, property, descriptor) {
    if (Object(object) !== object) {
      throw new TypeError("Object.defineProperty can only be called on Objects.")
    }
    if (Object(descriptor) !== descriptor) {
      throw new TypeError("Property description can only be an Object.")
    }
    if ("get" in descriptor || "set" in descriptor) {
      throw new TypeError("getters & setters can not be defined on this javascript engine")
    }
    if ("value" in descriptor) {
      object[property] = descriptor.value;
    }
    return object;
  };
}
if (!Object.getOwnPropertyDescriptor) {
  Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
    if (Object(object) !== object) {
      throw new TypeError("Object.getOwnPropertyDescriptor can only be called on Objects.")
    }
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return descriptor;
    }
    var descriptor = {
      enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
      configurable: true
    };
    descriptor.value = object[property];
    var psPropertyType = object.reflect.find(property).type;
    descriptor.writable = !(psPropertyType === "readonly");
    return descriptor;
  };
}
if (!Object.freeze) {
  Object.freeze = function freeze(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.freeze can only be called on Objects.")
    }
    return object;
  };
}
if (!Object.getPrototypeOf) {
  Object.getPrototypeOf = function (object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.getPrototypeOf can only be called on Objects.")
    }
    return object.__proto__;
  };
}
if (!Object.getOwnPropertyNames) {
  Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.getOwnPropertyNames can only be called on Objects.")
    }
    var names = [];
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    for (var prop in object) {
      if (hasOwnProperty.call(object, prop)) {
        names.push(prop);
      }
    }
    var properties = object.reflect.properties;
    var methods = object.reflect.methods;
    var all = methods.concat(properties);
    for (var i = 0; i < all.length; i += 1) {
      var prop = all[i].name;
      if (hasOwnProperty.call(object, prop) && !propertyIsEnumerable.call(object, prop)) {
        names.push(prop);
      }
    }
    return names;
  };
}
if (!Object.isExtensible) {
  Object.isExtensible = function isExtensible(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.isExtensible can only be called on Objects.")
    }
    return true;
  };
}
if (!Object.isFrozen) {
  Object.isFrozen = function isFrozen(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.isFrozen can only be called on Objects.")
    }
    return false;
  };
}
if (!Object.keys) {
  Object.keys = function (object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.keys can only be called on Objects.")
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var result = [];
    for (var prop in object) {
      if (hasOwnProperty.call(object, prop)) {
        result.push(prop);
      }
    }
    return result;
  };
}
if (!Object.isSealed) {
  Object.isSealed = function isSealed(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.isSealed can only be called on Objects.")
    }
    return false;
  };
}
if (!Object.seal) {
  Object.seal = function seal(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.seal can only be called on Objects.")
    }
    return object;
  };
}

if (!Object.preventExtensions) {
  Object.preventExtensions = function preventExtensions(object) {
    if (Object(object) !== object) {
      throw new TypeError("Object.preventExtensions can only be called on Objects.")
    }
    return object;
  };
}

if (typeof JSON !== "object") { JSON = {}; }
(function () {
  "use strict"; var rx_one = /^[\],:{}\s]*$/; var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g; var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; var rx_four = /(?:^|:|,)(?:\s*\[)+/g; var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; function f(n) { return n < 10 ? "0" + n : n; }
  function this_value() { return this.valueOf(); }
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" +
        f(this.getUTCMonth() + 1) + "-" +
        f(this.getUTCDate()) + "T" +
        f(this.getUTCHours()) + ":" +
        f(this.getUTCMinutes()) + ":" +
        f(this.getUTCSeconds()) + "Z" : null;
    }; Boolean.prototype.toJSON = this_value; Number.prototype.toJSON = this_value; String.prototype.toJSON = this_value;
  }
  var gap; var indent; var meta; var rep; function quote(string) { rx_escapable.lastIndex = 0; return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }) + "\"" : "\"" + string + "\""; }
  function str(key, holder) {
    var i; var k; var v; var length; var mind = gap; var partial; var value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key); }
    if (typeof rep === "function") { value = rep.call(holder, key, value); }
    switch (typeof value) {
      case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null"; }
        gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null"; }
          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v;
        }
        if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } }
        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v;
    }
  }
  if (typeof JSON.stringify !== "function") {
    meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\" }; JSON.stringify = function (value, replacer, space) {
      var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " "; } } else if (typeof space === "string") { indent = space; }
      rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify"); }
      return str("", { "": value });
    };
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      var j; function walk(holder, key) {
        var k; var v; var value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } }
        return reviver.call(holder, key, value);
      }
      text = String(text); rx_dangerous.lastIndex = 0; if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return "\\u" +
            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) { j = eval("(" + text + ")"); return (typeof reviver === "function") ? walk({ "": j }, "") : j; }
      throw new SyntaxError("JSON.parse");
    };
  }
}());