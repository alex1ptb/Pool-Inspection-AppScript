//old code
// function codeViolationList(data) {
//   console.log(`getting code violations`);
//   if (data["Code Violations"].valueOf().toString().indexOf(" ") != -1) {
//     var codeViolationsToLookUp = data["Code Violations"].valueOf().split(" ");
//     var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
//     codeViolationInfo = codeViolationInfo.join(" ");
//   } else {
//     //singular value just doing 1
//     var codeViolationsToLookUp = data["Code Violations"].valueOf();
//     var codeViolationInfo = getCodeViolationList(codeViolationsToLookUp);
//   }
//   console.log("end of code violations update");
//   return codeViolationInfo;
// }

//The new code

function makeListOfVideos(data) {
  console.log(`function logs makeListOfVideos`);
  //   console.log(`JSON Data MakeLiftOfVideos: ${JSON.stringify(data)}`);
  if (
    data["Inspection Video Link"] == undefined ||
    data["Inspection Video Link"] == null
  ) {
    // console.log("data is undefined or null inside makeListOfVideos");
    return "";
  }
  console.log(`getting video list: ${data["Inspection Video Link"]}`);

  //check if there is more than 1 video
  //length of the string is greater than 1
  if (data["Inspection Video Link"].valueOf().toString().indexOf(" ") != -1) {
    var videosToLookUp = data["Inspection Video Link"].valueOf().split(" ");
    console.log(`videos to lookup: ${videosToLookUp}`);
    console.log(`videos to lookup length: ${videosToLookUp.length}`);
    //go through the videos and apend the video link to the li inside file email_Template_Form26.html
    // return videosToLookUp;
    var videoList = [];
    for (var i = 0; i < videosToLookUp.length; i++) {
      console.log(
        `inside for loop for adding new lines; video to look up: ${videosToLookUp[i]}`
      );
      var video = videosToLookUp[i];
      videoList.push(video + "\n");
      // videoList += ` \n ${video} \n `;
      //   console.log(`video step ${i}: ${videoList}`);
    }
    console.log(`video list & length: ${videoList}, ${videoList.length}}`);
    return videoList;
  } else {
    //singular value just doing 1
    // console.log(`just 1 video`);
    var videosToLookUp = data["Inspection Link Video"].valueOf();
    console.log(`Should be sinlge value - videos to lookup: ${videosToLookUp}`);
    return videosToLookUp;
  }
}
