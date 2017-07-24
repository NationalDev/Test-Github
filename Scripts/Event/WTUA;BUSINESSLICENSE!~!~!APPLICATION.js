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


showDebug = "true"; 
logDebug("Start of Job" + " "); 
mainProcess(); 

function mainProcess() 
{ 
	capModel = aa.cap.getCapModel().getOutput(); 
	capTypeModel = capModel.getCapType(); 
	capTypeModel.setGroup("BusinessLicense"); 
	capTypeModel.setType("Type"); 
	capTypeModel.setSubType("SubType"); 
	capTypeModel.setCategory("License"); 
	capModel.setCapType(capTypeModel); 
	capModel.setCapStatus("Active"); 
	appListResult = aa.cap.getCapIDListByCapModel(capModel); 
	logDebug("Able to retrieve app list for given model:" + appListResult.getSuccess()); 
	if (appListResult.getSuccess()) 
	{
		appList = appListResult.getOutput(); 
		for(lic in appList) 
		{ 
			thisCap = appList[lic]; 
			thisCapId = aa.cap.getCapID(thisCap.getCapID().getID1(),thisCap.getCapID().getID2(),
                                           thisCap.getCapID().getID3()).getOutput(); 
			var b1ExpResult = aa.expiration.getLicensesByCapID(thisCapId); 
			var b1Exp = b1ExpResult.getOutput(); 
			var expDate = b1Exp.getExpDateString();
			var expStat = b1Exp.getExpStatus();
			logDebug("Attempting to use 'getExpStatus()' for " + thisCapId + " expirying on this date: " + expDate); 
			if (expStat.equalsIgnoreCase("About to Expire")) 
			{ 
				if (expDate.equals("2017-12-31")) 
				{ 
					logDebug("Expiration Status: " + expStat); 
					/* the following status change doesn't appear to get saved or committed*/ 
					b1Exp.setExpStatus("Active"); 

					//To save the above change, you must use the following call to commit your updates
					aa.expiration.editB1Expiration(b1Exp.getB1Expiration());
				}
			}
		} 
	}
}






////*****************************************************************************************************
//

if (wfTask == "License Issuance" && wfStatus == "Issued") { 	//Status on businesslicense Application record to trigger creation of parent License record
	//branch("LIC Establish Links to Reference Contacts"); 		// May not be needed on BusinessLicense 
	//branch("LIC Issue Business License");						//added line 04 to this SC to getAppName from Application record and copy to parent Liceense record
	newLic = null;
    newLicId = null;
    newLicIdString = null;
    var b1ExpResult = aa.expiration.getLicensesByCapID(newLicId); 
	var b1Exp = b1ExpResult.getOutput(); 
	var expDate = b1Exp.getExpDateString(newLicId);
    
    
    
    
//    newLicenseType = "Business";
//    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        //editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
        }
    
    
    

//    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);

    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,capId);
        thisLic.setExpiration(expDate);
        thisLic.setStatus("Active");
        }

    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", capId);
        }

    if (newLicId) {
        copyOwner(capId, newLicId);
        }

    if (newLicId) {
        copyASITables(capId,newLicId);
        }
    logDebug("Business License Issued" + expDate);
	}