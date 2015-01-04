$(function() {
  'use strict';

  // Get an Array of addressible classes, that are to represent
  // individually addressible LED groups, representing 'words' on the word clock
  function getAddressibleClasses() {
    // ignoredClasses serves two purposes:
    // 1) ignore a few classes that are used for display like
    // 2) filter out duplicates 
    var ignoredClasses = {
      'active': true,
      'minute': true,
      'hour': true,
      'extra': true
    };
    var classes = [].map
          .call($('#world-clock td'),function(obj) { return $(obj).attr('class').split(' '); }) /* get array of arrays of classes for each td */
          .reduce(function(left, right) { return left.concat(right); }) /* flatten into one array containing all classes for all tds */
          .filter(function(obj) { return ignoredClasses.hasOwnProperty(obj) ? false : (ignoredClasses[obj] = true); }); /* filter out duplicates */
    return classes;
  }

  window.getAddressibleClasses = getAddressibleClasses;

  var numCells = $('td').length;
  var numUsableCells = numCells - $('td.extra').length;
  var numRows = $('tr').length;
  var numCols = $('tr').first().children('td').length;
  var numActiveCells = $('td.active').length;

  $('#numCells').text(numCells);
  $('#numActiveCells').text(numActiveCells);
  $('#numUsableCells').text(numUsableCells);
  $('#numRows').text(numRows);
  $('#numCols').text(numCols);

  var addressibleGroups = getAddressibleClasses();
  $('#numAddressibleGroups').text(addressibleGroups.length);
  addressibleGroups.forEach(function(group) {
    $('#addressibleGroupsList').append(
      $('<li>' + group + '</li>')
      );
  });

});
