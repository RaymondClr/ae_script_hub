import * as _ from "soil-ts";
(function () {
    const compItem = app.project.items.addComp(" ", 100, 56, 1, 10, 30);
    if (compItem) {
        const checkComp = false;
        compItem.openInViewer();
        const shapeLayer = compItem.layers.addShape();
        shapeLayer.name = " ";
        shapeLayer.shy = true;
        const checkCompShySwitch = compItem.hideShyLayers;
        compItem.hideShyLayers = true;
        const colorEffect = _.addProperty(shapeLayer, ["ADBE Effect Parade", "ADBE Color Control"]);
        colorEffect.name = " ";
        const colorProp = colorEffect.property("ADBE Color Control-0001") as ColorProperty;
        colorProp.selected = true;
        app.executeCommand(2241);
        const colorValue = colorProp.value;
        alert(colorValue);
        checkComp ? (shapeLayer.remove(), (compItem.hideShyLayers = checkCompShySwitch)) : compItem.remove();
    }
})();
