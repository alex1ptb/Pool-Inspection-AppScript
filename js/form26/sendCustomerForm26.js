function sendForm26(data, pdfURL) {
  //send the form 26 to the customer
  console.log("sending form 26");
  let email = data["Email"];
  let name = data["Name"];
  console.log(pdfURL);
  let form26ID = pdfURL.match(/[-\w]{25,}(?!.*[-\w]{25,})/);
  console.log(form26ID);
  form26ID = DriveApp.getFileById(form26ID);
  let subject = `${data["Street"]} - Form 26 Non-Conformity Notice - ${data["Date Of Inspection"]}`;
  let body = `${name}, \n
    Please find attached details of your pool fence/barrier inspection: \n \n
    Address: ${data["Street"]} ${data["Suburb"]} ${data["Local Government Area"]} ${data["Postcode"]} \n
    Attached: QBCC Form 26 \n
    See videos for more details. \n
    videos: ${data["Inspection Video Link"]} \n\n
    Your pool barrier was inspected as requested and a Form 26 has
been issued (see attached Form 26 and detail).\n
For any pool barrier remedial/building work it is recommended that you engage a QBCC licensed tradesperson/builder who understands the required pool fence & safety regulations and who will guarantee that their work will pass inspection.\n
\n
For any clarification regarding pool safety building/compliance/regulations you may wish to refer to the Building Act 1975, Australian Standards 1926 \n
Part 1 and Part 2 and QDC MP 3.4, local council requirements and QBCC guidelines:\n
https://www.legislation.qld.gov.au/view/html/inforce/current/act-1975-011 \n
https://www.hpw.qld.gov.au/__data/assets/pdf_file/0015/4812/qdcmp3.4swimmingpoolbarriers.pdf \n
https://www.standards.org.au/standards-catalogue/sa-snz/building/cs-034/as--1926-dot-1-2012 \n
https://www.qbcc.qld.gov.au/home-building-owners/pool-safety/overview \n
Once the changes have been made please contact our office via email to arrange a new inspection:\n`;

  GmailApp.createDraft(email, subject, body, {
    attachments: [form26ID],
    name: "Form 26 PDF",
  });
  console.log("sent form 26");
  SpreadsheetApp.getActiveSpreadsheet().toast("Form 26 sent to " + name);
}
