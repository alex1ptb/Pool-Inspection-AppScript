//take the url of the pdf and put it in the sheet named "Form Response 1" in the correct column and row
function inputPDFUrlToSheet(data, pdfURL) {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //Current SpreadSheet
  const formResponse = ss.getSheetByName("Form Responses 1");
  const lastColumn = formResponse.getLastColumn();
  const headerKeys = formResponse.getRange(1, 1, 1, lastColumn).getValues();
  var data = data;
  if (data == null || data == "" || data == undefined) {
    console.log("data is null");
    return;
  }
  var pdfURL = pdfURL;
  console.log(`inputing pdf url to sheet`);
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  //check for unique id in the data object, if it is found then use it to find the row in the sheet
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
            headerKeys[0].indexOf("Link to Generated Form 26 for customer") + 1
          )
          .setValue(pdfURL);
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
            headerKeys[0].indexOf("Link to Generated Form 26 for customer") + 1
          )
          .setValue(pdfURL);
        break;
      }
      index--;
    }
    console.log(`pdf url inputed to sheet`);
    return;
  }
}
