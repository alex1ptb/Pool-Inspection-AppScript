function insertCheckBoxesOntoSheet(basicInfo) {
  var getDataRowCount = basicInfo.activeSheet.getRange(
    basicInfo.headerRowNumber + 1,
    2,
    basicInfo.activeSheet.getLastRow(),
    2
  );
  var boxAmount = getDataRowCount.getValues().length;
  lookUpsheet
    .getRange(
      basicInfo.headerRowNumber + 1,
      1,
      boxAmount - basicInfo.headerRowNumber
    ) //the minus 6 is to account for the top section
    .insertCheckboxes();
}
