function newMain() {
  //grab basic info from the sheet (Name,last column, etc)
  console.log("getting basic information");
  let basicInfo = getBasicInfo();
  console.log("basic info received");
  //array of objects populated from rows in the sheet that have been checked inside of the checkbox column
  console.log("creating objects of row data");
  let mappedData = createObjectsofRowData(basicInfo);
  mappedData
  console.log(`created ${mappedData.length} objects`);
  //create a form 26 for each row that has been checked
  let form26 = createForm26Document(mappedData, basicInfo);

  //input the form 26 url to the sheet
  let inputForm26ToSheet = inputPDFUrlToSheet(form26, basicInfo);
  //console.log(form26);

sendConfirmationEmail(mappedData);
  //let sendForm26 = sendForm26(form26, basicInfo);
  
}
