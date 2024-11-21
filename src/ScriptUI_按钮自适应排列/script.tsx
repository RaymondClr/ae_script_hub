import * as _ from "soil-ts";

type ItemMargins = [number, number, number, number];

let palette = new Window("palette", undefined, undefined, { resizeable: true });
palette.orientation = "row";
let buttons = _.times(20, (x) => palette.add("button", [0, 0, 50, 50] as Bounds, String(x)));
palette.show();

function autoResize(elements: _Control[], margins: ItemMargins, spacing: number) {
    const numItems = elements.length;
    if (numItems == 0) {
        return false;
    }

    let itemMaxWidth = Math.max(..._.map(elements, (item) => item.size.width)) + spacing;
    let itemMaxHeigh = Math.max(..._.map(elements, (item) => item.size.height)) + spacing;

    palette.onResize = function () {
        let countMaxItems = Math.floor((this.size.width - margins[2] /* 右边距 */ + spacing) / itemMaxWidth);
        /*
        clamp(-10, -5, 5)
        // => -5
        
        clamp(10, -5, 5)
        // => 5
        */
        let clamped = _.clamp(countMaxItems, 1, numItems); /* 确保最少有一列，最多为控件数量 */
        /*
        chunk(['a', 'b', 'c', 'd'], 2)
        // => [['a', 'b'], ['c', 'd']]

        chunk(['a', 'b', 'c', 'd'], 3)
        // => [['a', 'b', 'c'], ['d']]
        */
        var splitedItems = _.chunk(elements, clamped); /* 对控件进行切片操作 */
        _.forEach(splitedItems, function (items, rows) {
            _.forEach(items, function (item, columns) {
                item.location = [margins[0] /* 左边距 */ + itemMaxWidth * columns, margins[1] /* 顶边距 */ + rows * itemMaxHeigh] as Point;
            });
        });
        // 以下为窗口高度自适应处理，不需要可以删除
        var countSplited = splitedItems.length; /* 统计切成了几组，也就是控件排列的行数 */
        this.size.height = countSplited * itemMaxHeigh + margins[3] /* 底边距 */;
    };
}

autoResize(buttons, palette.margins as unknown as ItemMargins, palette.spacing);
