//get the checked boxes row numbers and return them as an array
function getCheckedBoxesRowArray(basicInfo) {
  var basicInfo = getBasicInfo();
  console.log(`column of checkbox is ${basicInfo.checkboxColumnIndex}`);
  console.log("Getting checked boxes row numbers");
  //go through column of checkboxes and get the row numbers of the checked boxes
  var checkme = [];
  for (var i = 0; i < basicInfo.lastRow; i++) {
    if (
      basicInfo.activeSheet
        .getRange(i + basicInfo.headerRowNumber, basicInfo.checkboxColumnIndex)
        .isChecked() //if checkbox is checked
    ) {
      Logger.log(
        basicInfo.activeSheet
          .getRange(
            i + basicInfo.headerRowNumber,
            basicInfo.checkboxColumnIndex
          )
          .getValue()
      );
      //push the row number to the array
      checkme.push(i + 1);
    }
  }
  // log each object in array to console
  console.log(`checked is ${checkme}`);
  return checkme;
}
