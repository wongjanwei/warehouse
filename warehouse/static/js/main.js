// Note: This file only exists temporarily. Once the rest of this code gets
//       ported to using the ES6 syntax and is part of the warehouse package
//       this will be removed. New code should go in
//       warehouse/static/js/warehouse and not here.

import $ from "jquery";
import "timeago";


$(document).ready(function() {

  // Toggle accordion
  $(".-js-accordion-trigger").click(function(){
    $(this).closest('.accordion').toggleClass("accordion--closed");
  });

  function setTab(tab) {
    if (tab) {
      $(".js-vertical-tab-content").hide();
      tab.show();
      $(".is-active").removeClass("is-active");
      $("a[href^='#"+tab[0].id+"']").addClass("is-active");
    }
  }

  function getTab(selector) {
    var tab = $(".js-vertical-tab-content" + selector);
    return (selector && tab.length) ? tab : null;
  }

  window.onhashchange = function() {
    setTab(getTab(location.hash) || getTab(":first"));
  };

  // Set the tab if the hash is valid, otherwise show the first tab
  setTab(getTab(location.hash) || getTab(":first"));

  // If in tab mode
  $(".-js-vertical-tab").click(function(event) {
    event.preventDefault();
    history.pushState(null, "", $(this).attr("href"));
    setTab(getTab(location.hash));
  });

  // If in accordion mode
  $(".-js-vertical-tab-accordion-heading").click(function(event) {
    event.preventDefault();
    history.pushState(null, "", $(this).attr("href"));
    setTab(getTab(location.hash));
  });

  // Launch filter popover on mobile
  $("body").on("click", ".-js-add-filter", function(e){
    e.preventDefault();
    $(".dark-overlay").show();
    $(".panel-overlay").show();
  });

  $("body").on("click", ".-js-close-panel", function(e){
    e.preventDefault();
    $(".dark-overlay").hide();
    $(".panel-overlay").hide();
  });

  // Position Sticky bar
  function positionWarning(){
    var height = $(".sticky-bar").outerHeight();
    $("body:has(.sticky-bar)").css("paddingTop", height);
  }

  positionWarning();

  $(window).resize(function(){
    positionWarning();
  });

  $.timeago.settings.cutoff = 7 * 24 * 60 * 60 * 1000;  // One week

  // document.l10n.ready.then(function() {
  //   // Format all of the time.relative tags to display relative time.
  //   $(".-js-relative-time").timeago();
  // });
  $(".-js-relative-time").timeago();  // Add back to document.l10n.ready

});
