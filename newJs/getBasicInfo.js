//function get basic information of sheet
function getBasicInfo() {
  console.log("getting basic information");
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var basicInfo = {}; //get basic info of sheet
  basicInfo.activeSheet = activeSheet;
  basicInfo.sheetName = activeSheet.getName();
  basicInfo.headerRowNumber = basicInfo.sheetName == "Look Up" ? 6 : 2; //if sheet is "Look Up" then header row is 6, else it is 2
  basicInfo.lastRow = activeSheet.getLastRow() - basicInfo.headerRowNumber;
  basicInfo.lastColumn = activeSheet.getLastColumn();
  //get header keys
  basicInfo.headerKeys = activeSheet
    .getRange(basicInfo.headerRowNumber, 1, 1, basicInfo.lastColumn)
    .getDisplayValues(); //get column index for column name "Checkbox"
  basicInfo.checkboxColumnIndex =
    basicInfo.headerKeys[0].indexOf("Checkbox") + 1;
  console.log(`basic info received`);
  return basicInfo;
}
