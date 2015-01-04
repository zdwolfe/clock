$(function() {
  'use strict';

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
});
