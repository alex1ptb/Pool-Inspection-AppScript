function test(){
  var huh = DocumentApp.create('abab')
  form26Template.makeCopy()
}

//VARIABLES
  const form26TemplateID = '1li7y5Kn-k_ij_reYharZCdFa9uHu0V7F0q0p6WMfsUU'
  const codeViolationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Code Violation Data')
  const folderIDforCreatedDocs = '1c4YRLQ9zYpYO1RFaFbfTtyQh_KAq5_s4' //folder to hold all created docs
  const folderIDforCreatedPdfs = '1n9CJoIwWCfZdCmEUk4KyX7QVBgtmesd-' //folder to hold all created pdfs
  const form26Template = DriveApp.getFileById(form26TemplateID)
  const destinationFolderForCreatedDocs = DriveApp.getFolderById(folderIDforCreatedDocs)
  const destinationFolderForCreatedPdfs = DriveApp.getFolderById(folderIDforCreatedPdfs)
  const ss = SpreadsheetApp.getActiveSpreadsheet() //Current SpreadSheet
  const formResponse = ss.getSheetByName('Form Responses 1')
  var arrayOfRows = []
  const headerRowCount = 1 //remove header row count from lastRow value to not get extra rows
  const lastColumn = formResponse.getLastColumn()
  const lastRow = formResponse.getLastRow() - headerRowCount
  const jobConfirmationStatus = 'Confirmation Email Timestamp'
  const form26SentStatus ='Date Form 26 emailed to customer'
  const headerKeys = formResponse.getRange( headerRowCount, 1, 1, lastColumn ).getValues();
//

