//go through violations and pull relevant text
function getCodeViolationList(codeViolationsToLookUp) {
  //get data from rows in "Code Violations Sheet"
  const rows = codeViolationSheet.getDataRange().getValues();
  var codeInfo = [];
  rows.forEach((value) => {
    //if null return
    if (codeViolationsToLookUp == "") {
      return;
    }
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
    //otherwise go through each and push the data up
    else {
      codeViolationsToLookUp.forEach((code) => {
        //if code is found. push data up
        if (value[2] == code && value[1] != "") {
          codeInfo.push(`${value[1]} \n
          --------------------------------------------------------------------
          \n`);
        }
      });
    }
  });
  console.log(codeInfo);
  return codeInfo;
}
//
