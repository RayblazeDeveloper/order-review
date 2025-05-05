$(function () {
  "use strict";

  let isEditMode = false; // 🔥 Move this to the top

  const spacer36 = $(".spacer-36");
  const spacer22 = $(".spacer-22");

  $('[data-toggle="offcanvas"]').on("click", function () {
    $(".offcanvas-collapse").toggleClass("open");
  });

  $("#sidebarMenu .nav-link").on("click", function (e) {
    const targetId = $(this).attr("href");

    $("#sidebarMenu .nav-link").removeClass("active");
    $(this).addClass("active");

    // if (targetId === "#" || targetId === "") {
    //   e.preventDefault();

    //   // Show only view sections, not edit ones
    //   $(".main [id]").not("[id$='_edit']").show();
    //   $(".main [id$='_edit']").hide();

    //   $(".main > *").show();
    //   $(".main .row").show();
    //   $(".main .row > *").show();
    //   $(".main *").removeClass("visible-row");
    //   spacer22.show();
    //   spacer36.show();

    //   // Reset edit mode state and button text
    //   $("#edit_btn").text("Edit");
    //   isEditMode = false;

    //   return;
    // }

    if (!targetId || targetId.trim() === "#") {
      location.reload();
      return;
    }

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();

      const $allIdElements = $(".main [id]");

      $allIdElements.hide();
      spacer36.hide();
      spacer22.hide();

      const $target = $(targetId);

      if ($target.length) {
        $target.show();

        $target.find("select, input, checkbox, label").show();
        $target.find(".row, .col").show();

        if ($target.parents(".row").length) {
          $target.parents().each(function () {
            $(this).show().addClass("visible-row");

            if ($(this).hasClass("row")) {
              $(`#${$target.attr("id")} .spacer-22`).css("display", "block");

              $(this)
                .children()
                .each(function () {
                  if (!$(this).is($target) && !$.contains(this, $target[0])) {
                    $(this).hide();
                  }
                });
            }
          });
        }
      }

      // Exit edit mode if user navigates
      $(".main [id$='_edit']").hide();
      $("#edit_btn").text("Edit");
      isEditMode = false;
    }
  });

  // Show all elements by default when page loads
  $(".main [id]").show();
  $(".main > *").show();

  // Hide all edit sections initially
  $(".main [id$='_edit']").hide();

  $("#edit_btn").on("click", function (e) {
    e.preventDefault();

    const $editSections = $(".main [id$='_edit']");
    const $viewSections = $(".main [id]").not("[id$='_edit']");
    const $spacers = $(".spacer-36, .spacer-22");

    if (!isEditMode) {
      $viewSections.hide();
      $editSections.show();
      $spacers.hide();

      // 🔥 Force all inputs, selects, textareas, and labels to be block inside edit sections
      $editSections
        .find("input, select, textarea, label")
        .css("display", "block");

      // Optional: also show .d-flex and .form-check if you're using those wrappers
      $editSections.find(".d-flex, .form-check").css("display", "flex");

      $(this).text("Save");
      isEditMode = true;
    } else {
      $editSections.hide();
      $viewSections.show();
      $spacers.show();

      $(this).text("Edit");
      isEditMode = false;
    }
  });
});
