//get code violations and their resulting value
//if there are multiple values, run split on it
function codeViolationList(data) {
  if (data["Code Violations"].valueOf().toString().indexOf(" ") != -1) {
    var codeViolationsToLookUp = data["Code Violations"].valueOf().split(" ");
    var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
    codeViolationInfo = codeViolationInfo.join(" ");
  } else {
    //singular value just doing 1
    var codeViolationsToLookUp = data["Code Violations"].valueOf();
    var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
  }
  return codeViolationInfo;
}
