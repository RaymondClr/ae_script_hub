// Raymond Yan (raymondclr@foxmail.com / qq: 1107677019) - 2024/5/14 11:20:15
// 哔哩哔哩：https://space.bilibili.com/634669（无名打字猿）
// 爱发电：https://afdian.net/a/raymondclr

(function () {
    function createIsNativeType(nativeObject) {
        return function (value) {
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
    function fileToBinary(file) {
        var content = readFile(file, "binary");
        return content === null ? "" : content.toSource();
    }
    fileString = fileToBinary("D:\\test.png");
    alert(fileString);
}).call(this);
