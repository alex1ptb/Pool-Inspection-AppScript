function newMain(event) {
  //get id of clicked element
  var id = event;
  //grab basic info from the sheet (Name,last column, etc)
  // console.log("getting basic information");
  let basicInfo = getBasicInfo();
  // console.log("basic info received");
  //array of objects populated from rows in the sheet that have been checked inside of the checkbox column
  // console.log("creating objects of row data");
  let mappedData = createObjectsofRowData(basicInfo);
  //SpreadsheetApp.getActiveSpreadsheet().toast(id);
  if (id === "job-confirmation-email") {
    console.log("sending email");
    sendConfirmationEmail(mappedData);
    return;
  } else if (id === "send-pdf-email") {
    console.log("sending pdf");
    createForm26Document(mappedData);
    inputPDFUrlToSheet(form26, basicInfo);
    return;
  } else if (id === "clear-checkboxes") {
    unCheckBoxes(basicInfo);
    return;
  }
}
