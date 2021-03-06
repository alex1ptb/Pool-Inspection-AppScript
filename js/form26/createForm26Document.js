function createForm26Document(
  mappedData,
  form26TemplateID,
  destinationFolderForCreatedDocs,
  destinationFolderForCreatedPdfs,
  form26ID
) {
  if (mappedData == undefined){
    mappedData = createObjectsofRowData(getBasicInfo)
  }
  mappedData.forEach((data) => {
    //if there is data in the column then skip
    if (data["Link to Generated Form 26 for customer"]) {
      console.log(`${data["Name"]} already has a form 26`);
      let pdfURL = data["Link to Generated Form 26 for customer"];
      if (data["Date Form 26 emailed to customer"] == "") {
        console.log(`skipped making pdf and straight to sending`)
        sendForm26(data, pdfURL);
        updateSheetWithTimeStampforForm26(data);
      }
      return;
    }
    //if there is no data in the column then create a form 26 file
    else {
      console.log(`${data["Name"]} does not have a form 26, creating one`);
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `Creating Form 26 for ${data["Name"]} \n Please wait...`
      );
      //save a copy to drive
      const form26Template = DriveApp.getFileById(form26TemplateID);

      var copy = form26Template.makeCopy(
        `${data["Street"]} - Form 26 Non-conformity Notice`,
        destinationFolderForCreatedDocs
      );
    } //end else
    let doc = DocumentApp.openById(copy.getId());
    //get the form 26 template and start replacing the values
    let body = doc.getBody();
    body.replaceText("{{name}}", data["Name"]);
    body.replaceText("{{street}}", data["Street"]);
    body.replaceText("{{suburb}}", data["Suburb"]);
    body.replaceText("{{postcode}}", data["Postcode"]);
    body.replaceText("{{lotdetails}}", data["Lot Number"]);
    body.replaceText("{{plandetails}}", data["CH/RP/SP/GTP/BUP"]);
    body.replaceText("{{governmentarea}}", data["Local Government Area"]);
    body.replaceText("{{inspectionvideo}}", data["Inspection Video Link"]);
    body.replaceText("{{codeviolations}}", codeViolationList(data));
    body.replaceText(
      "{{inspectiondate}}",
      new Date(data["Date of Inspection"]).toLocaleDateString()
    );
    body.replaceText("{{date}}", new Date().toLocaleDateString("pt-PT"));
    if (data["Type of Fence"].valueOf() == "NOT Shared") {
      body.replaceText("{{shared}}", "");
      body.replaceText("{{notshared}}", "???");
    } else {
      body.replaceText("{{notshared}}", "");
      body.replaceText("{{shared}}", "???");
    }

    //save and close
    doc.saveAndClose();

    //convert file to pdf
    var docblob = doc.getBlob();
    docblob.setName(doc.getName() + ".pdf");
    const pdfDocument = destinationFolderForCreatedPdfs.createFile(docblob);
    const pdfURL = pdfDocument.getUrl();
    //add the pdf url to the sheet
    inputPDFUrlToSheet(data, pdfURL);
    //let the user know that the form 26 has been created
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Form 26 created for " + data["Name"]
    );
    //send the form 26 to the customer
    sendForm26(data, pdfURL, form26ID);
    updateSheetWithTimeStampforForm26(data);
    //update the sheet with time stamp of when the form 26 was sent
  });
}
