function insertCheckBoxesOntoSheet(basicInfo) {
    // SpreadsheetApp.getActive().toast("Inserting Checkboxes");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  let target = ss.getSheetByName("Look Up");
  // if (activeSheet.sheetName == "Look Up") {
    target
      .getRange(7, 1, target.getLastRow()-6)
      .insertCheckboxes();
  //  if (basicInfo.sheetName == "Todays Job") {
  //   basicInfo.activeSheet
  //     .getRange(3, 1, basicInfo.activeSheet.getLastRow())
  //     .insertCheckboxes();
  // }
 return
}
