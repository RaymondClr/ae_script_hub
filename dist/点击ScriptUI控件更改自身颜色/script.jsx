// 2024/11/21 23:11:48

(function() {
    (function() {
        var palette = new Window("palette");
        var panel = palette.add("panel", [ 0, 0, 50, 50 ]);
        panel.addEventListener("click", function() {
            var color = $.colorPicker(-1);
            baseSetPanelBackgroundColor(panel, color);
        });
        palette.show();
        function baseSetPanelBackgroundColor(control, hex) {
            control.graphics.backgroundColor = control.graphics.newBrush(control.graphics.BrushType.SOLID_COLOR, hexToColor(hex));
        }
        function hexToColor(hex) {
            var r = hex >> 16;
            var g = (hex & 0x00ff00) >> 8;
            var b = hex & 0xff;
            return [ r / 255, g / 255, b / 255, 1 ];
        }
    })();
}).call(this);
