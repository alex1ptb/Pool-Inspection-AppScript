function sendForm26(data, pdfURL) {
  //send the form 26 to the customer
  console.log("sending form 26");
  let email = data["Email"];
  let name = data["Name"];
  console.log(pdfURL);
  let form26ID = pdfURL.match(/[-\w]{25,}(?!.*[-\w]{25,})/);
  console.log(form26ID);
  form26ID = DriveApp.getFileById(form26ID);
  let subject = "Form 26 for " + name;
  let body = `Please find attached the form 26 for ${name}.
        \n\n
        Here is the video link for the inspection: ${data["Inspection Video Link"]}
        `;
  GmailApp.createDraft(email, subject, body, {
    attachments: [form26ID],
    name: "Form 26 PDF",
  });
  console.log("sent form 26");
}
