function updateSheetWithTimeStampforConfirmationEmail(data) {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  if (data["Unique ID"]) {
    var index = sheet.getLastRow();
    while (index > 0) {
      if (sheet.getRange(index, 2).getValue() == data["Unique ID"]) {
        console.log(`found unique id in sheet`);
        //set the value of the pdf url column in the row
        //column is named "Link to Generated Form 26 for customer"
        sheet
          .getRange(
            index,
            headerKeys[0].indexOf("Confirmation Email Timestamp") + 1
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
            headerKeys[0].indexOf("Confirmation Email Timestamp") + 1
          )
          .setValue(new Date().toLocaleString());
        break;
      }
      index--;
    } //console.log(`pdf url inputed to sheet`);
    return;
  }
}
