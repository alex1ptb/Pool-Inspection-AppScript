function sendConfirmationEmail(mappedData) {
  // console.log(`Sending Confirmation Email`);
  mappedData.forEach((data) => {
    if (data["Confirmation Email Timestamp"] == "") {
      var htmlTemplate = HtmlService.createTemplateFromFile(
        "html/email_Template_JobDateConfirmation.html"
      );
      var subject = "Confirmation of Inspection";
      htmlTemplate.Name = data["Name"];
      htmlTemplate.dateOfInspection = new Date(
        parseInt(data["Date of Inspection"], 10)
      );
      htmlTemplate.Email = data["Email"];
      htmlTemplate.Street = data["Street"];
      htmlTemplate.Suburb = data["Suburb"];
      htmlTemplate.Postcode = data["Postcode"];
      htmlTemplate.GovernmentArea = data["Local Government Area"];
      htmlTemplate.Number = data["Phone Number"];
      htmlBody = htmlTemplate.evaluate().getContent();
      GmailApp.createDraft(data["Email"], subject, htmlBody, {
        htmlBody: htmlBody,
      });
      updateSheetWithTimeStampforConfirmationEmail(data);
    }
  });
  return;

  //   formResponse
  //     .getRange(2 + i, emailedStatusColumn)
  //     .setValue(new Date());
  //   var Name = arrayOfRows[i]["Name"]; //get name
  //   var dateOfInspection = arrayOfRows[i]["Date of Inspection"];
  //   var Email = arrayOfRows[i]["Email"];
  //   var Street = arrayOfRows[i]["Street"];
  //   var Suburb = arrayOfRows[i]["Suburb"];
  //   var Postcode = arrayOfRows[i]["Postcode"];
  //   var GovernmentArea = arrayOfRows[i]["Local Government Area"];
  //   var Number = arrayOfRows[i]["Phone Number"];
}
