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

if (wfStatus == "Request for Corrections") {
        sendExternalReviewNotification();   
}


if (wfTask == "License Issuance" && wfStatus == "Issued") {
//->branch("LIC Issue Business License");
    newLic = null;
    newLicId = null;
    newLicIdString = null;

    
    
    
    monthsToInitialExpire = 12;
    
    
    
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        
    	newLicIdString = newLicId.getCustomID();
        
        copyAppSpecific(capId);
        copyAddresses(capId,newLicId);
        copyASITables(capId,newLicId);
        copyASIFields(capId,newLicId);       
        copyContacts(capId,newLicId);
        editAppName(capName,newLicId);       
        updateAppStatus("Active","Originally Issued",newLicId);
        
        var b1ExpResult = aa.expiration.getLicensesByCapID(newLicId); 
    	var b1Exp = b1ExpResult.getOutput(); 
    	var expDate = b1Exp.getExpDateString();
    	var expStat = b1Exp.getExpStatus();
    	
    	logDebug("Attempting to use 'getExpStatus()' for " + thisCapId + " expirying on this date: " + expDate); 

        editAppName(getAppSpecific("Doing Business As (DBA) Name"),newLicId);
    }
//*****************************************************************************************************
    
  	
//	if (expStat.equalsIgnoreCase("About to Expire")) 
//	{ 
//		if (expDate.equals("2017-12-31")) 
//		{ 
//			logDebug("Expiration Status: " + expStat); 
//			/* the following status change doesn't appear to get saved or committed*/ 
//			b1Exp.setExpStatus("Active"); 
//
//			//To save the above change, you must use the following call to commit your updates
//			aa.expiration.editB1Expiration(b1Exp.getB1Expiration()); 
//    
    
//*****************************************************************************************************    
    
    tmpNewDate = dateAddMonths(expDate, monthsToInitialExpire);
    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));

}
    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(tmpNewDate);
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
    logDebug("Business License Issued" + tmpNewDate);
	}