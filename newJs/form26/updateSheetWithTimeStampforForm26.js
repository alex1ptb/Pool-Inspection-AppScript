function updateSheetWithTimeStampforForm26(data) {
  console.log("I RAN AND IM SUPPOSED TO BE DELETED");
  //update "Form Response 1" sheet in the column "Date Form 26 emailed to customer" with the time stamp of when the form 26 was sent
  let sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Response 1");
  //if data has "Unique ID" then find the row with that id and update the column "Date Form 26 emailed to customer" with the time stamp of when the form 26 was sent
  if (data["Unique ID"]) {
    let row = sheet.getRange(data["Unique ID"] + ":Unique ID").getValue();
    sheet
      .getRange(row, "Date Form 26 emailed to customer")
      .setValue(new Date().toLocaleString());
  }
  //if the data does not have "Unique ID" then find the row with the "ID" and update the column "Date Form 26 emailed to customer" with the time stamp of when the form 26 was sent
  else {
    let row = sheet.getRange(data["ID"] + ":ID").getValue();
    sheet
      .getRange(row, "Date Form 26 emailed to customer")
      .setValue(new Date().toLocaleString());
  }
}
