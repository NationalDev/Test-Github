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
if (wfTask == "License Issuance" && wfStatus == "Issued") { 	//Status on businesslicense Application record to trigger creation of parent License record
	//branch("LIC Establish Links to Reference Contacts"); 		// May not be needed on BusinessLicense 
	//branch("LIC Issue Business License");						//added line 04 to this SC to getAppName from Application record and copy to parent Liceense record
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
    
    function getCapExpirationDate(itemCap) {
        var expDate = null;
        b1ExpResult = aa.expiration.getLicensesByCapID(itemCap);
        if (b1ExpResult.getSuccess()) {
            b1Exp = b1ExpResult.getOutput();
            b1ExpInfo = b1Exp.getB1Expiration();
            expDate = b1ExpInfo.getExpDate();
        }
        return expDate;
}
    
    var newDate = null; 
    

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
        copyASITables(capId,newLicId);
        }
    logDebug("Business License Issued" + "---" + expDate);
	}
