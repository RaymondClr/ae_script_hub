//自定义绘图-画圆 v1.0 2022-04-05
//Raymond Yan 2022 (RaymondClr@outlook.com / QQ: 1107677019)

var palette = new Window("palette{properties:{resizeable:true},canvas:Custom{type:'customView'}}");
palette.alignChildren = ["center", "center"];
palette.margins = 0;

//一个窗口事件侦听，在调整窗口边界时，让画板实时居中。
palette.onResizing = function () {
    this.layout.resize();
};

var 画板 = palette.canvas;

//画板大小
画板.size = [600, 600];

var 描边宽度 = 5;
var 描边颜色 = [1, 1, 1, 1];
var 填充颜色 = [1, 0, 0, 1];
var 笔刷类型 = 画板.graphics.PenType.SOLID_COLOR;
var 钢笔 = 画板.graphics.newPen(笔刷类型, 描边颜色, 描边宽度);
var 笔刷 = 画板.graphics.newBrush(笔刷类型, 填充颜色);

画板.onDraw = function () {
    var 圆左上角起点x = 描边宽度,
        圆左上角起点y = 描边宽度,
        //设置起点等于描边宽度以及减去描边宽度*2都是为了防止描边超出画板被裁切
        圆右下角终点x = 画板.size[0] - 描边宽度 * 2,
        圆右下角终点y = 画板.size[1] - 描边宽度 * 2;
    //用控件的ellipsePath方法画圆
    画板.graphics.ellipsePath(圆左上角起点x, 圆左上角起点y, 圆右下角终点x, 圆右下角终点y);
    //描边要用钢笔
    画板.graphics.strokePath(钢笔);
    //填色要用笔刷
    画板.graphics.fillPath(笔刷);
};

palette.show();
