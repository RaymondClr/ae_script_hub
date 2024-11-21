// 2024/11/21 23:10:29

(function() {
    (function() {
        var palette = "palette{properties:{resizeable:true},canvas:Custom{type:'customView'}}";
        var window = new Window(palette);
        window.alignChildren = [ "center", "center" ];
        window.margins = 0;
        window.onResizing = function() {
            this.layout.resize();
        };
        var 画板 = window.canvas;
        画板.size = [ 600, 600 ];
        var 描边宽度 = 5;
        var 描边颜色 = [ 1, 1, 1, 1 ];
        var 填充颜色 = [ 1, 0, 0, 1 ];
        var 笔刷类型 = 画板.graphics.PenType.SOLID_COLOR;
        var 钢笔 = 画板.graphics.newPen(笔刷类型, 描边颜色, 描边宽度);
        var 笔刷 = 画板.graphics.newBrush(笔刷类型, 填充颜色);
        画板.onDraw = function() {
            var 圆左上角起点x = 描边宽度, 圆左上角起点y = 描边宽度, 圆右下角终点x = 画板.size[0] - 描边宽度 * 2, 圆右下角终点y = 画板.size[1] - 描边宽度 * 2;
            画板.graphics.ellipsePath(圆左上角起点x, 圆左上角起点y, 圆右下角终点x, 圆右下角终点y);
            画板.graphics.strokePath(钢笔);
            画板.graphics.fillPath(笔刷);
        };
        window.show();
    })();
}).call(this);
