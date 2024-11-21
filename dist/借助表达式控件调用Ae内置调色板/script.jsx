// 2024/11/21 23:11:12

(function() {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function has(object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }
    function createIsNativeType(nativeObject) {
        return function(value) {
            return value != null && value instanceof nativeObject;
        };
    }
    var isCompItem = createIsNativeType(CompItem);
    function isLayer(value) {
        return has(value, "containingComp") && isCompItem(value.containingComp) && value.parentProperty === null && value.propertyDepth === 0;
    }
    var isMaskPropertyGroup = createIsNativeType(MaskPropertyGroup);
    var isPropertyGroup = createIsNativeType(PropertyGroup);
    function isAddableProperty(value) {
        return isPropertyGroup(value) || isMaskPropertyGroup(value) || isLayer(value);
    }
    function addProperty(rootProperty, path) {
        var index = 0;
        var length = path.length;
        var nested = rootProperty;
        while (nested && isAddableProperty(nested) && index < length) {
            var name = path[index++];
            var next = nested.property(name);
            if (next) {
                nested = next;
            } else if (nested.canAddProperty(name)) {
                nested = nested.addProperty(name);
            }
        }
        return index && index === length ? nested : undefined;
    }
    (function() {
        var compItem = app.project.items.addComp(" ", 100, 56, 1, 10, 30);
        if (compItem) {
            var checkComp = false;
            compItem.openInViewer();
            var shapeLayer = compItem.layers.addShape();
            shapeLayer.name = " ";
            shapeLayer.shy = true;
            var checkCompShySwitch = compItem.hideShyLayers;
            compItem.hideShyLayers = true;
            var colorEffect = addProperty(shapeLayer, [ "ADBE Effect Parade", "ADBE Color Control" ]);
            colorEffect.name = " ";
            var colorProp = colorEffect.property("ADBE Color Control-0001");
            colorProp.selected = true;
            app.executeCommand(2241);
            var colorValue = colorProp.value;
            alert(colorValue);
            checkComp ? (shapeLayer.remove(), compItem.hideShyLayers = checkCompShySwitch) : compItem.remove();
        }
    })();
}).call(this);
