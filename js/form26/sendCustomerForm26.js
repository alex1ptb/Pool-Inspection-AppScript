function sendForm26(data, pdfURL) {
  console.log(`data: ${JSON.stringify(data)}`);
  console.log(`pdfURL: ${pdfURL}`);
  //send the form 26 to the customer
  console.log("sending form 26");

  let email = data["Email"];
  let name = data["Name"];
  console.log(`name: ${name}`);
  let form26ID = pdfURL.match(/[-\w]{25,}(?!.*[-\w]{25,})/);
  console.log(`original form26ID: ${form26ID}`);
  form26ID = DriveApp.getFileById(form26ID).getAs("application/pdf");
  console.log(`form26ID: ${form26ID}`);

  //////FIX THE DATE
  let subject = `${data["Street"]} - Form 26 Non-Conformity Notice - ${data[
    "Date of Inspection"
  ].toLocaleDateString()}`;

  var htmlTemplate = HtmlService.createTemplateFromFile(
    "html/email_Template_Form26.html"
  );
  htmlTemplate.name = data["Name"];
  htmlTemplate.street = data["Street"];
  htmlTemplate.suburb = data["Suburb"];
  htmlTemplate.postcode = data["Postcode"];
  htmlTemplate.governmentArea = data["Local Government Area"];
  htmlTemplate.link = data["Inspection Video Link"];
  htmlBody = htmlTemplate.evaluate().getContent();
  options = {};
  options.htmlBody = htmlBody;
  options.attachment = {
    fileName: `${data["Street"]} - Form 26 Non-conformity Notice.pdf ${data[
      "Date of Inspection"
    ].toLocaleDateString()}`,
    mimeType: "application/pdf",
    attachment: form26ID,
  };
  console.log(`attachment info: ${JSON.stringify(options.attachment)}`);

  //console.log(options)

  GmailApp.createDraft(email, subject, "", {
    htmlBody: options.htmlBody,
    attachments: [form26ID],
    name: options.attachment.fileName,
    mimeType: options.attachment.mimeType,
  });
  console.log("sent form 26");
  SpreadsheetApp.getActiveSpreadsheet().toast("Form 26 sent to " + name);
}
