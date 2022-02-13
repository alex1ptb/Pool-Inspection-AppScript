//get all rows from sheet "Form Responses 1" that have a value of "AA" in the "Business" column and return the values in an array
function getAAJobs() {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Form Responses 1");
  //get header row and return the values in an array
  var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var headerRowValues = [];
  for (var i = 0; i < headerRow.length; i++) {
    headerRowValues.push(headerRow[i]);
  }
  var range = sheet.getRange(3, 1, sheet.getLastRow(), 1);
  var values = range.getValues();
  var aaJobs = [];
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == "AA") {
      aaJobs.push(values[i][0]);
    }
  }
  //map the values in the array to the header row
  var aaJobsWithHeaders = [];
  for (var i = 0; i < aaJobs.length; i++) {
    key = aaJobs[i];
    value = headerRowValues[i];
    aaJobsWithHeaders.push([key, value]);
    //aaJobsWithHeaders.push(key + ": " + value);
  }
  return aaJobsWithHeaders;
}
