//Copy form 26 template and update with relevant information
function createForm26File() {
  var basicInfo = getBasicInfo();
  var checkedValuesRow = getCheckedBoxesRowArray(basicInfo);
  var rowData = [];
  //check each row and get its data
  for (let i = 0; i < checkedValuesRow.length; i++) {
    //get the row number
    var rowNumber = checkedValuesRow[i];
    rowData.push(
      basicInfo.activeSheet
        .getRange(rowNumber, 1, 1, basicInfo.lastColumn)
        .getValues()
    );
    console.log(`data is ${rowData}`);
  }
}

//Script to copy Form 26 and update with relevant information
function createForm26Files() {
  //sheet to pull data from
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  const lastColumn = sheet.getLastColumn(); //last column of sheet
  const lastRow = sheet.getLastRow() - 2; //Removing rows as that is apart of the header section
  const rows = sheet.getRange(3, 1, lastRow, lastColumn).getValues(); //get values
  const headerKeys = sheet.getRange(1, 1, 1, lastColumn).getValues(); //header
  var checkedValues = getCheckedBoxes(); //get list of rows that are checked by user

  rows.forEach((row, index) => {
    for (let k = 0; k < checkedValues.length; k++) {
      if (row[0] == checkedValues[k][1]) {
        var businessColumnNum = headerKeys[0].indexOf("Business");
        var codeViolationsColumnNum = headerKeys[0].indexOf("Code Violations");
        //ignore header
        if (index === 0) return;
        //ignore if file already created
        if (
          row[
            headerKeys[0].indexOf("Link to Generated Form 26 for customer") + 1
          ]
        ) {
          return;
        }
        // if business is AA, skip the form process
        if (row[businessColumnNum].valueOf() == "AA") {
          Logger.log("found AA");
          return;
        }
        //create copy of template and put in destination folder
        const copy = form26Template.makeCopy(
          `${row[headerKeys[0].indexOf("Name")]} ${
            row[headerKeys[0].indexOf("Timestamp")]
          }`,
          destinationFolderForCreatedDocs
        );
        //open doc
        const doc = DocumentApp.openById(copy.getId());
        const body = doc.getBody();

        //get code violations and their resulting value
        //if there are multiple values, run split on it
        if (
          row[codeViolationsColumnNum].valueOf().toString().indexOf(" ") != -1
        ) {
          var codeViolationsToLookUp = row[codeViolationsColumnNum]
            .valueOf()
            .split(" ");
          var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
          codeViolationInfo = codeViolationInfo.join(" ");
        } else {
          //singular value just doing 1
          var codeViolationsToLookUp = row[codeViolationsColumnNum].valueOf();
          var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
        }

        body.replaceText("{{name}}", row[headerKeys[0].indexOf("Name")]);
        body.replaceText("{{street}}", row[headerKeys[0].indexOf("Street")]);
        body.replaceText("{{suburb}}", row[headerKeys[0].indexOf("Suburb")]);
        body.replaceText(
          "{{postcode}}",
          row[headerKeys[0].indexOf("Postcode")]
        );
        body.replaceText(
          "{{lotdetails}}",
          row[headerKeys[0].indexOf("Lot Number")]
        );
        body.replaceText(
          "{{plandetails}}",
          row[headerKeys[0].indexOf("CH/RP/SP/GTP/BUP")]
        );
        body.replaceText(
          "{{governmentarea}}",
          row[headerKeys[0].indexOf("Local Government Area")]
        );
        body.replaceText(
          "{{inspectionvideo}}",
          row[headerKeys[0].indexOf("Inspection Video Link")]
        );
        body.replaceText("{{codeviolations}}", codeViolationInfo);
        body.replaceText(
          "{{inspectiondate}}",
          new Date(
            row[headerKeys[0].indexOf("Date of Inspection")]
          ).toLocaleDateString("pt-PT")
        );
        body.replaceText("{{date}}", new Date().toLocaleDateString("pt-PT"));
        if (
          row[headerKeys[0].indexOf("Type of Fence")].valueOf() == "NOT Shared"
        ) {
          body.replaceText("{{shared}}", "");
          body.replaceText("{{notshared}}", "✓");
        } else {
          body.replaceText("{{notshared}}", "");
          body.replaceText("{{shared}}", "✓");
        }

        //save and close
        doc.saveAndClose();

        //convert file to pdf
        var docblob = doc.getBlob();
        docblob.setName(doc.getName() + ".pdf");
        const pdfDocument = destinationFolderForCreatedPdfs.createFile(docblob);
        const pdfURL = pdfDocument.getUrl();
        sheet
          .getRange(
            index + 3,
            headerKeys[0].indexOf("Link to Generated Form 26 for customer") + 1
          )
          .setValue(pdfURL);
      }
    }
  });
}
