function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Email")
    .addItem("Email Options", "showAdminSidebar")
    .addToUi();
  getBasicInfo();
  insertCheckBoxesOntoSheet(basicInfo);
}

function showAdminSidebar() {
  var widget = HtmlService.createHtmlOutputFromFile("html/SidebarLayout.html");
  widget.setTitle("Send Emails");
  SpreadsheetApp.getUi().showSidebar(widget);
}
