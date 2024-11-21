// 2024/11/21 23:11:40

(function() {
    var arrayProto = Array.prototype;
    var nativeJoin = arrayProto.join;
    function createIsNativeType(nativeObject) {
        return function(value) {
            return value != null && value instanceof nativeObject;
        };
    }
    var pathDesktop = Folder.desktop;
    var isCompItem = createIsNativeType(CompItem);
    var isFile = createIsNativeType(File);
    function newFile(path) {
        return new File(path);
    }
    function castFile(file) {
        return isFile(file) ? file : newFile(file);
    }
    function createPath() {
        return nativeJoin.call(arguments, Folder.fs === "Windows" ? "\\" : "/");
    }
    function getActiveItem() {
        return app.project.activeItem;
    }
    function getActiveComp() {
        var item = getActiveItem();
        return isCompItem(item) ? item : undefined;
    }
    function saveFrameToPng(file, compItem, time) {
        if (time === void 0) {
            time = compItem.time;
        }
        compItem.saveFrameToPng(time, castFile(file));
    }
    (function() {
        var activeComp = getActiveComp();
        if (activeComp) {
            var desktopPath = pathDesktop.fsName;
            var outputPath = createPath(desktopPath, "image.png");
            saveFrameToPng(outputPath, activeComp, activeComp.time);
        }
    })();
}).call(this);
