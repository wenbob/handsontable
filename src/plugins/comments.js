function Comments(instance) {

  var eventManager = Handsontable.eventManager(instance),
    doSaveComment = function (row, col, comment, instance) {
      instance.setCellMeta(row, col, 'comment', comment);
      instance.render();
    },
    saveComment = function (range, comment, instance) {
		 //LIKE IN EXCEL (TOP LEFT CELL)
      doSaveComment(range.from.row, range.from.col, comment, instance);
    },
    hideCommentTextArea = function () {
      var range = instance.getSelectedRange();
      if (! range)
        return;
      var td = instance.getCell(range.from.row, range.from.col);
      td.title = '';
    },
    bindMouseEvent = function (range) {
    },
    unBindMouseEvent = function () {
    },
    placeCommentBox = function (range, commentBox) {
    },
    createCommentBox = function (value) {
    },
    commentsMouseOverListener = function (event) {
    };

  return {
    init: function () {
      eventManager.addEventListener(document, 'mouseover', Handsontable.helper.proxy(commentsMouseOverListener));
    },
    showComment: function (range) {
			var meta = instance.getCellMeta(range.from.row, range.from.col),
        value = '';

      if (meta.comment) {
        value = meta.comment;
      }
      var td = instance.getCell(range.from.row, range.from.col);
      td.title = value;
    },
    removeComment: function (row, col) {
      instance.getCell(row, col).title = "";
      instance.removeCellMeta(row, col, 'comment');
      instance.render();
    },
    checkSelectionCommentsConsistency : function () {
      var hasComment = false;
      // IN EXCEL THERE IS COMMENT ONLY FOR TOP LEFT CELL IN SELECTION
      var cell = instance.getSelectedRange().from;

      if(instance.getCellMeta(cell.row,cell.col).comment) {
        hasComment = true;
      }
      return hasComment;
    }


  };
}


var init = function () {
    var instance = this;
    var commentsSetting = instance.getSettings().comments;

    if (commentsSetting) {
      instance.comments = new Comments(instance);
        instance.comments.init();
    }
  },
  afterRenderer = function (TD, row, col, prop, value, cellProperties) {
    if(cellProperties.comment) {
      Handsontable.Dom.addClass(TD, cellProperties.commentedCellClassName);
      TD.title = cellProperties.comment;
    }
  },
  addCommentsActionsToContextMenu = function (defaultOptions) {
    var instance = this;
    if (!instance.getSettings().comments) {
      return;
    }

    defaultOptions.items.push(Handsontable.ContextMenu.SEPARATOR);

    defaultOptions.items.push({
      key: 'commentsAddEdit',
      name: function () {
        var hasComment = instance.comments.checkSelectionCommentsConsistency();
        return Handsontable.t(hasComment ? "Edit Comment" : "Add Comment");

      },
      callback: function (key, selection, event) {
          instance.comments.showComment(this.getSelectedRange());
      },
      disabled: function () {
        return false;
      }
    });

    defaultOptions.items.push({
      key: 'commentsRemove',
      name: Handsontable.t("Delete Comment"),
      callback: function (key, selection, event) {
        instance.comments.removeComment(selection.start.row, selection.start.col);
      },
      disabled: function () {
        var hasComment = instance.comments.checkSelectionCommentsConsistency();
        return !hasComment;
      }
    });
  };

Handsontable.hooks.add('beforeInit', init);
Handsontable.hooks.add('afterContextMenuDefaultOptions', addCommentsActionsToContextMenu);
Handsontable.hooks.add('afterRenderer', afterRenderer);

