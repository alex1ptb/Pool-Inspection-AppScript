//Send out a Inspection confirmation date email to clients confirming the date of inspection
function jobConfirmationEmail() {
  getData();
  // getData is being removed as this should run off of the checked values in the spreadsheet and not the entire spreadsheet

  var checkme = getCheckedBoxes();

  //create and send email confirming job date and basic information
  //generate template
  for (let i = 0; i < arrayOfRows.length; i++) {
    // Logger.log(i)
    for (let j = 0; j < checkme.length; j++) {
      if (arrayOfRows[i]["ID"] == checkme[j][1]) {
        Logger.log(checkme[j][1]);
        //if emailed cell is empty, run code
        var emailedStatusColumn =
          headerKeys[0].indexOf(jobConfirmationStatus) + 1;

        if (
          formResponse.getRange(2 + i, emailedStatusColumn).getDisplayValue() ==
          ""
        ) {
          Logger.log("emailed status is blank");
          //If date of inspection is empty, don't send email
          if (
            formResponse
              .getRange(2 + i, headerKeys[0].indexOf("Date of Inspection") + 1)
              .getDisplayValue() != ""
          ) {
            Logger.log("inside inspection");
            //If business field does not equal company AA
            if (
              formResponse
                .getRange(2 + i, headerKeys[0].indexOf("Business") + 1)
                .getDisplayValue() != "AA"
            ) {
              //if unique id is filled then search that, else use ID
              // if checkme

              formResponse
                .getRange(2 + i, emailedStatusColumn)
                .setValue(new Date());
              var Name = arrayOfRows[i]["Name"]; //get name
              var date = arrayOfRows[i]["Date of Inspection"];
              var Email = arrayOfRows[i]["Email"];
              var Street = arrayOfRows[i]["Street"];
              var Suburb = arrayOfRows[i]["Suburb"];
              var Postcode = arrayOfRows[i]["Postcode"];
              var GovernmentArea = arrayOfRows[i]["Local Government Area"];
              var Number = arrayOfRows[i]["Phone Number"];
              var subject = "Confirmation of Inspection";
              var htmlTemplate = HtmlService.createTemplateFromFile(
                "email_Template_JobDateConfirmation.html"
              );
              htmlTemplate.Name = Name;
              htmlTemplate.date = date;
              htmlTemplate.Email = Email;
              htmlTemplate.Street = Street;
              htmlTemplate.Suburb = Suburb;
              htmlTemplate.Postcode = Postcode;
              htmlTemplate.GovernmentArea = GovernmentArea;
              htmlTemplate.Number = Number;
              htmlBody = htmlTemplate.evaluate().getContent();
              GmailApp.createDraft(Email, subject, htmlBody, {
                htmlBody: htmlBody,
              });
            }
          }
        }
      }
    }
  }
}
