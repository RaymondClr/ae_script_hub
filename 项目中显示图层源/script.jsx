// 此函数由LoYoi提交，欢迎访问我的官网，https://www.loyoi.cn
(function (){
  function showSelectedOrActiveComp() {
  var comp = app.project.activeItem;

  if (!comp || !(comp instanceof CompItem)) {
    return;
  }

  clearAllProjectSelections();

  if (comp.selectedLayers.length === 0) {
    comp.selected = true;
  } else {
    var sourceDisplayed = false;
    for (var i = 0; i < comp.selectedLayers.length; i++) {
      var layer = comp.selectedLayers[i];
      if (layer.source) {
        layer.source.selected = true;
        sourceDisplayed = true;
      }
    }

    if (!sourceDisplayed) {
      comp.selected = true;
    }
  }

  app.project.showWindow(true);
  // 使用命令，在项目中显示图层源
  app.executeCommand(2517);
}

/**取消项目中所有选中 */
function clearAllProjectSelections() {
  for (var j = 1; j <= app.project.numItems; j++) {
    if (app.project.item(j).selected) {
      app.project.item(j).selected = false;
    }
  }
}

showSelectedOrActiveComp();
})()

