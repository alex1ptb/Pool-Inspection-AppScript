function newMain(event) {
  //VARIABLES
  // After re-writing the code, I am unsure of which variables are actually being used. Will need to clean up and check for unused variables.
  const form26TemplateID = "1li7y5Kn-k_ij_reYharZCdFa9uHu0V7F0q0p6WMfsUU";
  const folderIDforCreatedDocs = "1c4YRLQ9zYpYO1RFaFbfTtyQh_KAq5_s4"; //folder to hold all created docs
  const folderIDforCreatedPdfs = "1n9CJoIwWCfZdCmEUk4KyX7QVBgtmesd-"; //folder to hold all created pdfs
  let destinationFolderForCreatedDocs = DriveApp.getFolderById(
    folderIDforCreatedDocs
  );
  const destinationFolderForCreatedPdfs = DriveApp.getFolderById(
    folderIDforCreatedPdfs
  );
  var arrayOfRows = [];
  const headerRowCount = 1; //remove header row count from lastRow value to not get extra rows
  const jobConfirmationStatus = "Confirmation Email Timestamp";
  const form26SentStatus = "Date Form 26 emailed to customer";
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //Current SpreadSheet
  const formResponse = ss.getSheetByName("Form Responses 1");
  const lastRow = formResponse.getLastRow() - headerRowCount;
  const lastColumn = formResponse.getLastColumn();
  const headerKeys = formResponse.getRange(1, 1, 1, lastColumn).getValues();
  //
  //get id of clicked element
  var id = event;
  //grab basic info from the sheet (Name,last column, etc)
  // console.log("getting basic information");
  let basicInfo = getBasicInfo();
  // console.log("basic info received");
  //array of objects populated from rows in the sheet that have been checked inside of the checkbox column
  // console.log("creating objects of row data");
  let mappedData = createObjectsofRowData(basicInfo);
  SpreadsheetApp.getActiveSpreadsheet().toast(id);
  if (id === "job-confirmation-email") {
    console.log("sending email");
    sendConfirmationEmail(mappedData);
    return;
  } else if (id === "send-pdf-email") {
    console.log("sending pdf");
    createForm26Document(
      mappedData,
      form26TemplateID,
      destinationFolderForCreatedDocs,
      destinationFolderForCreatedPdfs
    );
    return;
  } else if (id === "clear-checkboxes") {
    unCheckBoxes(basicInfo);
    return;
  }
}
