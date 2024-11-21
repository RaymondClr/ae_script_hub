// 2024/11/21 23:11:31

(function() {
    function createIsNativeType(nativeObject) {
        return function(value) {
            return value != null && value instanceof nativeObject;
        };
    }
    var isFile = createIsNativeType(File);
    function newFile(path) {
        return new File(path);
    }
    function castFile(file) {
        return isFile(file) ? file : newFile(file);
    }
    function readFile(path, encoding) {
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
    function fileToBinary(file) {
        var content = readFile(file, "binary");
        return content === null ? "" : content.toSource();
    }
    (function() {
        var fileString = fileToBinary("D:\\image.png");
        alert(fileString);
    })();
}).call(this);
