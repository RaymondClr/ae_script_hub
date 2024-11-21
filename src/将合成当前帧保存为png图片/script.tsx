import * as _ from "soil-ts";
(function () {
    const activeComp = _.getActiveComp();
    if (activeComp) {
        // 获取桌面路径
        const desktopPath = _.pathDesktop.fsName;
        // 拼接图片输出完整路径
        const outputPath = _.createPath(desktopPath, "image.png");
        _.saveFrameToPng(outputPath, activeComp, activeComp.time);
    }
})();
