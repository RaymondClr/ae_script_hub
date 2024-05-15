// Raymond Yan (raymondclr@foxmail.com / qq: 1107677019) - 2024/5/14 11:41:02
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
    function saveFrameToPng(file, compItem, time) {
        if (time === void 0) {
            time = compItem.time;
        }
        compItem.saveFrameToPng(time, castFile(file));
    }
    var compItem = app.project.items.addComp("示例合成", 100, 100, 1, 3, 24);
    saveFrameToPng("D:\\frame.png", compItem, 0);
}).call(this);
