// 2024/11/21 23:11:03

(function() {
    function setUndoGroup(undoString, func) {
        app.beginUndoGroup(undoString);
        func();
        app.endUndoGroup();
    }
    (function() {
        setUndoGroup("新建文件夹", function() {
            app.project.items.addFolder("新建文件夹");
        });
    })();
}).call(this);
