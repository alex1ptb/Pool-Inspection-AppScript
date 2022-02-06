//Function to get form data so it can be used to send out specified emails

//function get basic information of sheet
function getBasicInfo() {
  var activeSheet = SpreadsheetApp.getActiveSheet();
  //get basic info of sheet
  var basicInfo = {};
  basicInfo.activeSheet = activeSheet;
  basicInfo.sheetName = activeSheet.getName();
  //create ternery operator to check if sheet is "Look Up"
  //if sheet is "Look Up" then header row is 6, else it is 2
  basicInfo.headerRowNumber = basicInfo.sheetName == "Look Up" ? 6 : 2;
  basicInfo.lastRow = activeSheet.getLastRow();
  basicInfo.lastColumn = activeSheet.getLastColumn();
  //get header keys
  basicInfo.headerKeys = activeSheet
    .getRange(basicInfo.headerRowNumber, 1, 1, basicInfo.lastColumn)
    .getDisplayValues();
  //get column index for column name "Checkbox"
  basicInfo.checkboxColumnIndex =
    basicInfo.headerKeys[0].indexOf("Checkbox") + 1;
  return basicInfo;
}

//now that we have the basic info, we can work on getting the data from the
//specific sheet that has a checked box in it.
//get the checked boxes
function getCheckedBoxesRowArray() {
  var basicInfo = getBasicInfo();
  //go through column of checkboxes and get the row numbers of the checked boxes
  var checkme = [];
  for (var i = 0; i < basicInfo.lastRow; i++) {
    if (
      basicInfo.activeSheet
        .getRange(i + 1, basicInfo.checkboxColumnIndex)
        .isChecked()
    ) {
      checkme.push(i + 1);
    }
  }
  console.log(`checkme: ${checkme}`);
  return checkme;
}

function getData() {
  //Get values from spreadsheet
  //this needs to be better
  var values = formResponse
    .getRange(2, 1, lastRow, lastColumn)
    .getDisplayValues();
  //loop through rows and create an object with matching key values
  for (var l = 0; l < values.length; l++) {
    var result = {}; //create new object to hold all values
    //match header keys to values
    headerKeys[0].forEach((headerKeys, i) => {
      result[headerKeys] = values[l][i];
    });
    arrayOfRows.push(result);
  }
  return arrayOfRows;
}
