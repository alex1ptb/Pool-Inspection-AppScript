function updateSheetWithTimeStampforForm26(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //Current SpreadSheet
  const formResponse = ss.getSheetByName("Form Responses 1");
  const lastColumn = formResponse.getLastColumn();
  const headerKeys = formResponse.getRange(1, 1, 1, lastColumn).getValues();
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); //targeting shet to update
  if (data["Unique ID"]) {
    var index = sheet.getLastRow();
    while (index > 0) {
      //loop through rows starting at bottom
      if (sheet.getRange(index, 2).getValue() == data["Unique ID"]) {
        console.log(`found unique id in sheet`);
        //set the value of the pdf url column in the row
        //column is named "Link to Generated Form 26 for customer"
        sheet
          .getRange(
            index,
            headerKeys[0].indexOf("Date Form 26 emailed to customer") + 1
          )
          .setValue(new Date().toLocaleString());
        break;
      }
      index--;
    }
    console.log(`pdf url inputed to sheet`);
    return;
  }
  //if no unique id is found then use the "ID" in the data object to find the row in the sheet
  else {
    var index = sheet.getLastRow();
    while (index > 0) {
      if (
        sheet.getRange(index, 1).getValue() == data["ID"] &&
        !data["Unique ID"]
      ) {
        console.log(`found id in sheet`);
        //set the value of the pdf url column in the row
        //column is named "Link to Generated Form 26 for customer"
        sheet
          .getRange(
            index,
            headerKeys[0].indexOf("Date Form 26 emailed to customer") + 1
          )
          .setValue(new Date().toLocaleString());
        break;
      }
      index--;
    } //console.log(`pdf url inputed to sheet`);
    return;
  }
}
