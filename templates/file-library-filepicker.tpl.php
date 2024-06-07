<?php
/**
 * @file
 * Template file for filepicker dialog contents.
 *
 * - $content: rendered view to embed.
 * - $submit_form: form action to select item, oddly hidden.
 */
?>
<div class="file-browser">
  <div class="file-browser-view">
    <?php print $content; ?>
  </div>
  <?php print $submit_form; ?>
</div>
