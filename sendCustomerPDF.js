function sendCustomerPdf(){
  getData() //Need the data
  var emailedStatusColumn = headerKeys[0].indexOf(form26SentStatus)+1
  var attachmentURL = headerKeys[0].indexOf('Link to Generated Form 26 for customer')+1
  var checkedBoxes = getCheckedBoxes() //rows that need to be updated

  //create and send email with form 26 attached
  //generate template
	for ( let i = 0; i < arrayOfRows.length; i++ ){
      for( let k = 0; k < checkedBoxes.length; k++){
        if (arrayOfRows[i]["ID"] == checkedBoxes[k][1]){
    //if previously sent, dont send again
    if(formResponse.getRange(2 + i, headerKeys[0].indexOf('Code Violations')+1)
      .getDisplayValue() == "null"){ 
        return; 
      }
    if(formResponse.getRange(2 + i, emailedStatusColumn).getDisplayValue() == ""){
      //if pdf hasn't been created, run script to create
      if(formResponse.getRange(2 + i, attachmentURL).getDisplayValue() == ""){
        createForm26Files()
    }
    //if business is AA dont send
    if(formResponse.getRange(2 + i, headerKeys[0].indexOf('Business')+1).getDisplayValue() != "AA"){
      formResponse.getRange(2 + i, emailedStatusColumn).setValue(new Date())
		  var Email = arrayOfRows[ i ][ 'Email' ]
      var Name = arrayOfRows[ i ][ 'Name' ]
      var subject = 'Form 26 for Non Conformity Notice'
      var link = arrayOfRows[ i ][ 'Inspection Video Link' ]
      var fileUrl = arrayOfRows[ i ]['Link to Generated Form 26 for customer']
      if(fileUrl == ""){
        createForm26Files()
      }
      var htmlTemplate = HtmlService.createTemplateFromFile( "email_Template_Form26.html" );
          htmlTemplate.Name = Name
          htmlTemplate.Email = Email
          htmlTemplate.link = link
          htmlBody = htmlTemplate.evaluate().getContent();
      var fileID = getIdFromUrl(fileUrl)
    
      function getIdFromUrl(fileUrl) { return fileUrl.match(/[-\w]{25,}(?!.*[-\w]{25,})/); }

      var file = DriveApp.getFileById(fileID)
        GmailApp.createDraft(
            Email,
            subject,
            htmlBody,
            { 
              attachments: [ file], name: 'Form 26 PDF',
              htmlBody: htmlBody
            }
        )
      }
    }
  }        }
      }
}