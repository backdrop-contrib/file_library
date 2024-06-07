(function ($) {
  "use strict";

  Backdrop.behaviors.fileLibrary = {
    attach: function () {
      // If an item has been selected and it's on the current page, mark as
      // active again. Necessary when navigating with views pager.
      let activeValue = $('form.file-managed-file-browser-form [name="fid"]').val();
      if (activeValue) {
        $('.file-browser-view [data-fid=' + activeValue + ']').closest('.file-library-item').addClass('file-library-selected');
      }
    }
  };

  Backdrop.fileLibrary = {};
  Backdrop.fileLibrary.dialogAfterCreate = function(event, dialog, $element) {
    let $browserContainer = $element.find(".file-browser-view");
    if ($browserContainer.length) {
      // @todo keydown, dblclick
      $browserContainer.once('file-library').on('click', '[data-fid]', function () {
        console.log($(this).closest('.file-library-item'));
        $browserContainer.find('.file-library-selected').removeClass('file-library-selected');
        $(this).closest('.file-library-item').addClass('file-library-selected');

        let selectedFid = $(this).data('fid');
        $('form.file-managed-file-browser-form [name="fid"]').val(selectedFid);// magic!
      });
    }
  };

  $(window).on('dialog:aftercreate.fileBrowser', Backdrop.fileLibrary.dialogAfterCreate);
})(jQuery);
