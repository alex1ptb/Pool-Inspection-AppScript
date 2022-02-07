function createForm26PDF(mappedData) {
  mappedData.forEach((data) => {
    //if there is data in the column then skip
    if (data["Link to Generated Form 26 for customer"]) {
      console.log(`${data["Name"]} already has a form 26`);
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `${data["Name"]} already has a form 26, Skipping`
      );
      return;
    }
    //if there is no data in the column then create a form 26 file
    else {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `Creating Form 26 for ${data["Name"]}`
      );
      var form26Template = HtmlService.createTemplateFromFile("form26Template");
    }
  });
}
