function newMain() {
  //grab basic info from the sheet (Name,last column, etc)
  let basicInfo = getBasicInfo();

  //array of objects populated from rows in the sheet that have been checked inside of the checkbox column
  let mappedData = createObjectsofRowData(basicInfo);

  //if button is clicked in sidebar, depending on the id of the button, run the appropriate function
  let form26 = createForm26Document(mappedData, basicInfo);

  //console.log(form26);
}
