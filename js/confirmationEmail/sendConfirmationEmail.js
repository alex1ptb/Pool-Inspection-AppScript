function sendConfirmationEmail(mappedData) {
  // console.log(`Sending Confirmation Email`);
  mappedData.forEach((data) => {
    if (data["Confirmation Email Timestamp"] == "") {
      var htmlTemplate = HtmlService.createTemplateFromFile(
        "html/email_Template_JobDateConfirmation.html"
      );
      var subject = "Confirmation of Inspection";
      htmlTemplate.Name = data["Name"];
      htmlTemplate.dateOfInspection =
        data["Date of Inspection"].getDate() +
        "/" +
        (data["Date of Inspection"].getMonth() + 1) +
        "/" +
        data["Date of Inspection"].getFullYear();
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
  SpreadsheetApp.getActive().toast("Email Sent");
  return;
}
