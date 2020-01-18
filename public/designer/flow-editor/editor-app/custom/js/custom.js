
// 流程节点面板展开或收缩
function flowNodeCollapseOrExpand() {
  jQuery(".flow-node").toggle();
  jQuery(".flow-node-hide").toggle();
  jQuery("#flowDesigner").toggleClass("flow-designer-width2");
  jQuery("#flowDesigner").parent().toggleClass("flow-center-left2");
}

// 面板收缩或展开
function panelCollapseOrExpand(obj) {
  jQuery(obj).closest(".panel-heading").next().toggle();
  jQuery(obj).children("i").toggleClass("panel-heading-expand");
}