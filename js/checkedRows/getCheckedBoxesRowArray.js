//get the checked boxes row numbers and return them as an array
function getCheckedBoxesRowArray(basicInfo) {
  if (basicInfo == undefined){
    basicInfo = getBasicInfo()
  }
  //go through column of checkboxes and get the row numbers of the checked boxes
  var checkme = [];
  for (var i = 0; i <= basicInfo.lastRow; i++) {
    if (
      basicInfo.activeSheet
        .getRange(i + basicInfo.headerRowNumber, basicInfo.checkboxColumnIndex)
        .isChecked() //if checkbox is checked
    ) {
      //push the row number to the array
      checkme.push(i + 1);
    }
  }
  // log each object in array to console
  console.log(`rows checked: ${checkme}`);
  return checkme;
}
