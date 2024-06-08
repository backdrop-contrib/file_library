# File Library

Adds the ability to pick previously uploaded files for file fields (comparable
to the image library). For enabled file fields a button "Select
existing file" will appear, next to the upload form item.

This button opens a dialog, with a view as content.

![Screenshot of the dialog with a file selected](https://raw.githubusercontent.com/backdrop-contrib/file_library/1.x-1.x/screenshots/file-library-dialog.webp)

The view is configurable per field instance. You can also create (or clone) multiple views
and pick the one you prefer per field.

And, of course, you can leverage the full flexibility of views using the
views admin UI.

Regardless of configured views filters, the file picker will only show files
matching the extension setting of the current field.

Permissions to access the file library are configurable via views admin UI
(section "Access").
If someone's not permitted to access the view, the browse button won't show.

## Installation

- Install this module using the
  [official Backdrop CMS instructions](https://docs.backdropcms.org/documentation/extend-with-modules)

Go to a file field setting (like admin/structure/types/manage/NODE_TYPE/fields/FIELDNAME),
check the "Enable file picker" setting at the bottom and save.

## Issues

Bugs and feature requests should be reported in the
[Issue Queue](https://github.com/backdrop-contrib/file_library/issues).

## Current Maintainers

- Indigoxela (https://github.com/indigoxela)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.
