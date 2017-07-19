//*********************************************************************************************************/
//	WTUA;BUSINESSLICENSE!~!~!APPLICATION.js																	       /
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					WTUA:BUSINESSLICENSE/*/*/APPLICATION														   / 							
//																										   /
//*********************************************************************************************************/
//WTUA:BUSINESSLICENSE/*/*/APPLICATION script
//WTUA;BUSINESSLICENSE!~!~!APPLICATION

showDebug = true, showMessage = true;


if (wfTask == "License Issuance" && wfStatus == "Issued") { 	
	
	newLic = null;
    newLicId = null;
    newLicIdString = null;
//    newLicenseType = "Business";
//    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        //editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
        }
    
   //**************************************************************   
          

    var newDate = getCapExpirationDate(newLicId);
  
    

//    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);

    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(newDate);
        thisLic.setStatus("Active");
        }

    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", newLicId);
        }

    if (newLicId) {
        copyOwner(capId, newLicId);
        }

    if (newLicId) {
        copyASITables(capId, newLicId);
        }
    logDebug("Business License Issued" + "---" + expDate);
	}
