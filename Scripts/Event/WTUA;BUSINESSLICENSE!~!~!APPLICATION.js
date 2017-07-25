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
//        editAppSpecific("Expiration Date",dateAddMonths("06/30/YYYY",12));
        
        
        
        var b1ExpResult = aa.expiration.getLicensesByCapID(newLicId); 
    	var b1Exp = b1ExpResult.getOutput(); 
    	var expDate = b1Exp.getExpDateString();
    	var expStat = b1Exp.getExpStatus();
    	
    	logDebug("Attempting to use 'getExpStatus()' for " + capId + " expirying on this date: " + expDate); 

    	
    	tmpNewDate = dateAddMonths(expDate, monthsToInitialExpire);
    	
    	
        editAppName(getAppSpecific("Doing Business As (DBA) Name"),newLicId);
   
//*****************************************************************************************************
    
        tmpNewDate = new Date();

        if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Contractor Registration") {

            thisYear = parseInt(tmpNewDate.getYear().toString())+1900;

                thisYear + 1;
                newExpDate = "06/30/"+thisYear.toString();
           
                }
    
//*****************************************************************************************************    
    
    }   
   
    
    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);       
        thisLic.setExpiration(newExpDate);

}
    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(newExpDate);
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