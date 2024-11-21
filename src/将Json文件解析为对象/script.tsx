import * as _ from "soil-ts";
(function () {
    const jsonPath = "\\path\\to\\json.json"; /* 换成你的 Json 文件路径 */
    const fileString = _.parseJsonFile(jsonPath);
    // 需要使用 stringify 将对象转成字符串才能看到对象的所有属性和值。
    const objectString = _.stringify(fileString);
    alert(objectString);
})();
