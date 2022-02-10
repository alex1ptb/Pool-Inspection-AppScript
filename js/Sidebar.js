// var lookUpsheet =
//   SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Look Up");
// var todaysSheet =
//   SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Todays Job");
// var firstRow = 7; //first row that has actual data to look up
// var lookUpHeaders = lookUpsheet
//   .getRange(6, 1, 1, lookUpsheet.getLastColumn())
//   .getValues();

//Insert Checkbox into Lookup Sheet for running email and PDF code
//Need to have this run on each open

// function insertCheckBoxesOntoSheet() {
//   var getDataRowCount = lookUpsheet.getRange(
//     firstRow,
//     2,
//     lookUpsheet.getLastRow(),
//     2
//   );
//   var boxAmount = getDataRowCount.getValues().length;
//   lookUpsheet
//     .getRange(firstRow, 1, boxAmount - 6) //the minus 6 is to account for the top section
//     .insertCheckboxes();
// }

// function unCheckBoxes() {
//   lookUpsheet.getRange(7, 1, lookUpsheet.getLastRow()).uncheck();
//   todaysSheet.getRange(3, 1, lookUpsheet.getLastRow()).uncheck();
// }

// function getCheckedBoxes() {
//   var rangeOfCheckboxesforLookUpSheet = lookUpsheet.getRange(
//     7,
//     1,
//     lookUpsheet.getLastRow() - 6
//   );
//   var checkBoxValues = rangeOfCheckboxesforLookUpSheet.getValues();
//   var checkme = [];
//   var values = [];
//   for (var i = 0; i < checkBoxValues.length; i++) {
//     if (checkBoxValues[i][0] === true) {
//       checkme.push(i + 7); // Add 7 to account for header secton
//     }
//   }
//   for (var i = 0; i < checkme.length; i++) {
//     values.push(
//       lookUpsheet
//         .getRange(checkme[i], 1, 1, lookUpsheet.getLastColumn())
//         .getValues()[0]
//     );
//   }
//   return values;
// }

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Email")
    .addItem("Email Options", "showAdminSidebar")
    .addToUi();
}

function showAdminSidebar() {
  var widget = HtmlService.createHtmlOutputFromFile("html/SidebarLayout.html");
  widget.setTitle("Send Emails");
  SpreadsheetApp.getUi().showSidebar(widget);
}
