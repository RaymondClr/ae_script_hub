// 2024/11/21 23:10:56

(function() {
    (function() {
        function hexToFileString(hex) {
            var fileString = "";
            for (var i = 0; i < hex.length / 2; i += 1) {
                var bit = hex.substr(i * 2, 2);
                var s = String.fromCharCode(+("0x" + bit));
                fileString += s;
            }
            return fileString;
        }
        try {
            alert(hexToFileString("0x000003"));
        } catch (error) {
            alert(error.message);
        }
    })();
}).call(this);
