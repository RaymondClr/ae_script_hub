const { exec } = require("child_process");
const chokidar = require("chokidar");
const path = require("path");

const srcDir = path.resolve(__dirname, "../src");

// 创建监视器
const watcher = chokidar.watch(srcDir, {
    ignored: /node_modules/,
    persistent: true,
    ignoreInitial: true,
});

console.log(`正在监视 ${srcDir} 目录中的 .tsx 文件修改...`);

// 监听文件变化事件
watcher.on("change", (filePath) => {
    console.log(`检测到文件变动：${filePath}，开始编译...`);
    exec("npm run build", (err, out, errOutput) => {
        if (err) {
            console.error(`编译出错：\n${errOutput}`);
        } else {
            console.log(`编译完成：\n${out}`);
        }
    });
});
