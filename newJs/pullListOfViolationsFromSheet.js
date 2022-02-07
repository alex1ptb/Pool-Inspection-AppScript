//go through violations and pull relevant text
function getCodeViolationList(codeViolationsToLookUp) {
  //get data from rows in "Code Violations Sheet"
  const rows = codeViolationSheet.getDataRange().getValues();
  var codeInfo = [];
  rows.forEach((value) => {
    //Logger.log(`value: ${value[2]}`)
    if (codeViolationsToLookUp.length == null) {
      //if just 1 value, look it up and push it in
      if (value[2] == codeViolationsToLookUp.valueOf()) {
        codeInfo.push(`${value[1]} \n \n`);
        return;
      }
      //if no values then just return
      return;
    }
    //if null return
    if (codeViolationsToLookUp == "") {
      return;
    }
    //otherwise go through each and push the data up
    else {
      codeViolationsToLookUp.forEach((code) => {
        //if code is found. push data up
        if (value[2] == code) {
          codeInfo.push(`${value[1]} \n \n`);
        }
      });
    }
  });
  return codeInfo;
}
//
