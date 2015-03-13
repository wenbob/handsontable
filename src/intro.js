/*!
 * Handsontable @@version
 * Handsontable is a JavaScript library for editable tables with basic copy-paste compatibility with Excel and Google Docs
 *
 * Copyright 2012-2015 Marcin Warpechowski
 * Licensed under the MIT license.
 * http://handsontable.com/
 *
 * Date: @@timestamp
 */
/*jslint white: true, browser: true, plusplus: true, indent: 4, maxerr: 50 */

//var Handsontable = { //class namespace
//  plugins: {}, //plugin namespace
//  helper: {} //helper namespace
//};

var Handsontable = function (rootElement, userSettings) {
  userSettings = userSettings || {};
  var instance = new Handsontable.Core(rootElement, userSettings);
  instance.init();
  return instance;
};
Handsontable.plugins = {};
Handsontable.t = function(str){
  var res = Handsontable.t.en_US;
  return res[str] ? res[str] : str;
};
Handsontable.t.en_US = {};
Handsontable.t.zh_CN = {
  'Edit Comment': '修改注释',
  'Add Comment': '添加注释',
  'Delete Comment': '删除注释',
  'Insert row above': '插入行',
  'Insert row below': '追加行',
  'Insert column on the left': '插入列',
  'Insert column on the right': '追加列',
  'Remove row': '删除行',
  'Remove column': '删除列',
  'Undo': '还原',
  'Redo': '取消还原',
  'Read only': '只读',
  'Alignment': '对齐方式',
  'Left': '向左对齐',
  'Center': '水平中央对齐',
  'Right': '向右对齐',
  'Justify': '自动对齐',
  'Top': '向上对齐',
  'Middle': '垂直中央对齐',
  'Bottom': '向下对齐',  
  'Unmerge cells': '取消合并',
  'Merge cells': '合并单元格',
  'Freeze this column': '固定列',
  'Unfreeze this column': '取消固定列',
};

(function (window, Handsontable) {
  "use strict";
