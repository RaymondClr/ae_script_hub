import * as _ from "soil-ts";
(function () {
    _.setUndoGroup("新建文件夹", function () {
        app.project.items.addFolder("新建文件夹");
    });
})();
