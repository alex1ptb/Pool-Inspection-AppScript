function unCheckBoxes(basicInfo) {
  SpreadsheetApp.getActive().toast("Unchecking boxes");
  if (basicInfo.sheetName == "Look Up") {
    basicInfo.activeSheet
      .getRange(7, 1, basicInfo.activeSheet.getLastRow())
      .uncheck();
  } else if (basicInfo.sheetName == "Todays Job") {
    basicInfo.activeSheet
      .getRange(3, 1, basicInfo.activeSheet.getLastRow())
      .uncheck();
  }
  SpreadsheetApp.getActive().toast("Unchecked boxes");
}
