$(function () {
  "use strict";

  const spacer36 = $(".spacer-36");
  const spacer22 = $(".spacer-22");

  $('[data-toggle="offcanvas"]').on("click", function () {
    $(".offcanvas-collapse").toggleClass("open");
  });

  $("#sidebarMenu .nav-link").on("click", function (e) {
    const targetId = $(this).attr("href");

    $("#sidebarMenu .nav-link").removeClass("active");
    $(this).addClass("active");

    if (targetId === "#" || targetId === "") {
      e.preventDefault();
      $(".main [id]").show();
      $(".main > *").show();
      $(".main .row").show();
      $(".main .row > *").show();
      $(".main *").removeClass("visible-row");
      spacer22.show();
      spacer36.show();
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

        // Make sure all form elements and children inside the target are visible
        $target.find("select, input, checkbox, label").show();
        $target.find(".row, .col").show();

        // If the target is inside a row, we need to show the row but hide other elements in the row
        if ($target.parents(".row").length) {
          // Show all parent containers up to .main
          $target.parents().each(function () {
            $(this).show();
            $(this).addClass("visible-row");

            // If this is a row, hide its children except those that are parents of our target
            if ($(this).hasClass("row")) {
              console.log($target.attr("id"));

              $(`#${$target.attr("id")} .spacer-22`).css("display", "block");

              // Hide all direct children of the row, except elements inside #manage-property-type
              $(this)
                .children()
                .each(function () {
                  // If this child is not the target and doesn't contain the target, hide it
                  if (!$(this).is($target) && !$.contains(this, $target[0])) {
                    $(this).hide();
                  }
                });
            }
          });
        }
      }
    }
  });

  // Show all elements by default when page loads
  $(".main [id]").show();
  $(".main > *").show();
});
