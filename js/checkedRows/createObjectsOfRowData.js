function createObjectsofRowData(basicInfo) {
  if (basicInfo == undefined){
    basicInfo = getBasicInfo()
  }
  // console.log(`Creating Objects of Row Data`);
  var mappedData = [];
  var checkedValuesRowNumbers = getCheckedBoxesRowArray(basicInfo);
  var rowData = [];
  //check each row and get its data
  for (let i = 0; i < checkedValuesRowNumbers.length; i++) {
    //get the row number
    var rowNumber = checkedValuesRowNumbers[i] + basicInfo.headerRowNumber - 1;
    rowData.push(
      basicInfo.activeSheet
        .getRange(rowNumber, 1, 1, basicInfo.lastColumn)
        .getValues()
    );
    //map header to data
    var header = basicInfo.headerKeys[0];
    var data = rowData[i];
    var dataMap = {};
    for (let j = 0; j < header.length; j++) {
      dataMap[header[j]] = data[0][j];
    }
    mappedData.push(dataMap);
  }
  console.log(`mappedData: ${mappedData}`)
  return mappedData;
}
