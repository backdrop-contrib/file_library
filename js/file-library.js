/**
 * @file
 * Backdrop behaviors for the File Library.
 */
(function ($) {
  "use strict";

  Backdrop.behaviors.fileLibrary = {
    attach: function () {
      // If an item has been selected and it's on the current page, mark as
      // active again. Necessary when navigating with views pager.
      let activeValue = $('form.file-managed-file-browser-form [name="fid"]').val();
      if (activeValue) {
        if (activeValue.includes(',')) {
          const fids = activeValue.split(',');
          for (const fid of fids) {
            $('.file-browser-view [data-fid=' + fid + ']').closest('.file-library-item').addClass('file-library-selected');
          }
        }
        else {
          $('.file-browser-view [data-fid=' + activeValue + ']').closest('.file-library-item').addClass('file-library-selected');
        }
      }
      // Hack to turn off core File module click handling, which awfully gets
      // into the way as of core 1.34.
      // @see core/modules/file/js/file.js
      $(window).off('dialog:aftercreate.fileBrowser', Backdrop.file.dialogOpenEvent);
    }
  };

  Backdrop.fileLibrary = {};
  Backdrop.fileLibrary.dialogAfterCreate = function(event, dialog, $element) {
    let $browserContainer = $element.find(".file-browser-view");
    if ($browserContainer.length) {
      let selectedFids = [];
      const available = Backdrop.settings.file.browser.availableItemCount;
      const cardinality = Backdrop.settings.file.browser.fieldCardinality;
      const hint = Backdrop.t('Limit reached, this field can store at most @count items.', { '@count': cardinality });
      $browserContainer.append('<div id="file-library-limit-hint" popover><div class="icon"></div>' + hint + '</div>');
      let popover = document.getElementById('file-library-limit-hint');
      let popoverTimer = 0;
      $browserContainer.once('file-library').on('click keydown', '[data-fid]', function (event) {
        if (event.type === 'keydown' && event.which !== 13) {
          return;
        }
        if (event.target.nodeName === 'A') {
          // Preview link clicked, no bubbling up, let original event fire.
          event.stopPropagation();
          return true;
        }
        let $currentItem = $(this).closest('.file-library-item');
        if ($currentItem.hasClass('file-library-selected')) {
          $currentItem.removeClass('file-library-selected');
          if (cardinality === 1) {
            selectedFids = [];
          }
          else {
            let currentFid = $(this).data('fid');
            selectedFids = selectedFids.filter(function (fid) { return fid !== currentFid; });
          }
        }
        else {
          if (selectedFids.length >= available) {
            if (cardinality === 1) {
              $browserContainer.find('.file-library-selected').removeClass('file-library-selected');
              selectedFids = [];
            }
            else {
              window.clearTimeout(popoverTimer);
              popover.showPopover({ source: this });
              popoverTimer = window.setTimeout(function() {
                popover.hidePopover();
              }, 4000);
              return;
            }
          }
          $(this).closest('.file-library-item').addClass('file-library-selected');
          selectedFids.push($(this).data('fid'));
        }

        // From here on the file module, which provides the "fid" item, takes
        // over.
        // @see Backdrop.file.dialogCloseEvent
        $('form.file-managed-file-browser-form [name="fid"]').val(selectedFids);
      }).on('dblclick', '[data-fid]', function() {
        // Select this item and submit the form in one go. But only this one item.
        $('form.file-managed-file-browser-form [name="fid"]').val($(this).data('fid'));
        $(this).closest('.ui-dialog').find('.ui-dialog-buttonpane .button-primary').trigger('click');
      });
    }
  };

  $(window).on('dialog:aftercreate.fileBrowser', Backdrop.fileLibrary.dialogAfterCreate);
})(jQuery);
