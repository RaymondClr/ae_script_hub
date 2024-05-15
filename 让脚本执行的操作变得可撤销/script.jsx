// Raymond Yan (raymondclr@foxmail.com / qq: 1107677019) - 2024/5/14 11:38:44
// 哔哩哔哩：https://space.bilibili.com/634669（无名打字猿）
// 爱发电：https://afdian.net/a/raymondclr

(function () {
    function setUndoGroup(undoString, func) {
        app.beginUndoGroup(undoString);
        func();
        app.endUndoGroup();
    }
    setUndoGroup("新建文件夹", function () {
        app.project.items.addFolder("一个文件夹");
    });
}).call(this);
