function insertCheckBoxesOntoSheet(basicInfo) {
  if (basicInfo.sheetName == "Look up" || "Todays Job") {
    var getDataRowCount = basicInfo.activeSheet.getRange(
      basicInfo.headerRowNumber + 1,
      2,
      basicInfo.activeSheet.getLastRow(),
      2
    );
    var boxAmount = getDataRowCount.getValues().length;
    basicInfo.activeSheet
      .getRange(
        basicInfo.headerRowNumber + 1,
        1,
        boxAmount - basicInfo.headerRowNumber
      )
      .insertCheckboxes();
  } else {
    return;
  }
}
