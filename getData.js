//Function to get form data so it can be used to send out specified emails
//This info gets pulled from "Form Responses 1"
function getData(){
  //Get values from spreadsheet
	var values = formResponse.getRange( 2, 1, lastRow, lastColumn ).getDisplayValues();
  //loop through rows and create an object with matching key values
	for ( var l = 0; l < values.length; l++ ) 
	{
		var result = {}; //create new object to hold all values
		//match header keys to values 
		headerKeys[ 0 ].forEach( ( headerKeys, i ) =>
		{
			result[ headerKeys ] = values[ l ][ i ];
		} )
		arrayOfRows.push( result )
	}
	return arrayOfRows
}