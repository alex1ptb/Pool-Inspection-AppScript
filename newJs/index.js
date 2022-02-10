function newMain(event) {
  //get id of clicked element
  var id = event;
  //grab basic info from the sheet (Name,last column, etc)
  console.log("getting basic information");
  let basicInfo = getBasicInfo();
  console.log("basic info received");
  //array of objects populated from rows in the sheet that have been checked inside of the checkbox column
  console.log("creating objects of row data");
  let mappedData = createObjectsofRowData(basicInfo);
  mappedData;
  console.log(`created ${mappedData.length} objects`);
  //create a form 26 for each row that has been checked
  let form26 = createForm26Document(mappedData, basicInfo);

  //input the form 26 url to the sheet
  let inputForm26ToSheet = inputPDFUrlToSheet(form26, basicInfo);
  //console.log(form26);

  //if button clicked is job-confirmation-email button then send email
  if (id === "job-confirmation-email") {
    console.log("sending email");
    sendConfirmationEmail(mappedData);
  } else if (id === "send-pdf-email") {
    console.log("sending pdf");
    createForm26Document(mappedData);
    inputPDFUrlToSheet(form26, basicInfo);
  } else if (id === "clear-checkboxes") {
    unCheckBoxes(basicInfo);
  }
  //let sendForm26 orm26, basicInfo);
}
