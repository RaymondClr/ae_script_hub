(function () {
    function hexToFileString(hex: string) {
        var fileString = "";
        for (var i = 0; i < hex.length / 2; i += 1) {
            var bit = hex.substr(i * 2, 2);
            var s = String.fromCharCode(+("0x" + bit));
            fileString += s;
        }
        return fileString;
    }

    function formatIEEE64(value: string) {
        var isBigEndian = true;
        var ieee64 = decodeIEEE64(value);
        isBigEndian = !!isBigEndian;
        var e = ieee64.exponent;
        var m = ieee64.mantissa;
        var b7 = ieee64.isNegative ? 128 : 0 | (e >> 4);
        var b6 = ((e & 15) << 4) | (m / 281474976710656);
        var b5 = 0 | ((m % 281474976710656) / 1099511627776);
        var b4 = 0 | ((m % 1099511627776) / 4294967296);
        var b3 = 0 | ((m % 4294967296) / 16777216);
        var b2 = 0 | ((m % 16777216) / 65536);
        var b1 = 0 | ((m % 65536) / 256);
        var b0 = 0 | m % 256;
        var decArray = [b7, b6, b5, b4, b3, b2, b1, b0];
        var rString = "";
        for (var i = 0; i < decArray.length; i += 1) {
            rString += pad2(decArray[i].toString(16));
        }
        return rString;
    }

    function decodeIEEE64(value: string) {
        var _value = parseFloat(value);
        if (isNaN(_value)) {
            throw new Error("value must be a Number");
        }
        if (typeof _value !== "number") {
            throw new Error("value must be a Number");
        }
        var result = {
            isNegative: false,
            exponent: 0,
            mantissa: 0,
        };
        if (_value === 0) {
            return result;
        }
        if (!isFinite(_value)) {
            result.exponent = 2047;
            if (isNaN(_value)) {
                result.isNegative = false;
                result.mantissa = 2.25179981368525e15;
            } else {
                result.isNegative = _value === -Infinity;
                result.mantissa = 0;
            }
            return result;
        }
        if (_value < 0) {
            result.isNegative = true;
            _value = -_value;
        }
        var e = 0;
        if (_value >= Math.pow(2, -1022)) {
            var r = _value;
            while (r < 1) {
                e -= 1;
                r *= 2;
            }
            while (r >= 2) {
                e += 1;
                r /= 2;
            }
            e += 1023;
        }
        result.exponent = e;
        if (e != 0) {
            var f = _value / Math.pow(2, e - 1023);
            result.mantissa = Math.floor((f - 1) * Math.pow(2, 52));
        } else {
            result.mantissa = Math.floor(_value / Math.pow(2, -1074));
        }
        return result;
    }

    function pad2(num: string) {
        return "00" + num.substr(-2);
    }

    function stringToHex(str: string) {
        var hex = "";
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i).toString(16);
            while (code.length < 2) {
                code = "0" + code;
            }
            hex += code;
        }
        return hex;
    }

    try {
        alert(hexToFileString("0x000003"));
    } catch (error) {
        alert(error.message);
    }
})();
