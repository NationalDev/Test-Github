//*********************************************************************************************************/
//	WTUA;LICENSES!~!~!APPLICATION.js																	       /
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					WTUA:LICENSES/*/*/APPLICATION														   / 							
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
//****************************************************************************************    
//    appName = getAppName(capId);
//    editAppName(appName,newLicId);
    //line added by CIH 03012016;
    //var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
//    var ignore = ASICopyExceptions(newLicId);
 //   var ignoreArr = new Array();
  //  if(ignore != null) ignoreArr = ignore.split("|");
  //  copyAppSpecific(newLicId,ignoreArr);
//************************************************************************************    
//    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
//*************************************************************************************

//*************MY ADDITION************************************    
    
    var myCapId = capIDString;
    var capId = aa.cap.getCapID(myCapId).getOutput();
    b1ExpResult = aa.expiration.getLicensesByCapID(newLicID);
    var b1Exp = b1ExpResult.getOutput();
    var expDate = b1Exp.getExpDate();
    var newexpDate =  dateAddMonths(expDate.getMonth() + "/" + expDate.getDayOfMonth() + "/" + expDate.getYear(),24);
    
    licEditExpInfo("Active", newexpDate);
    
    logDebug("Expdate:" + expDate +"--" +newexpDate + "--" + newLicId);

    
    
    
//***************************************************************    
//    if (newLicId) {
//        thisLic = new licenseObject(newLicIdString,newLicId);
//        thisLic.setExpiration(dateAdd(tmpNewDate,0));
//        thisLic.setStatus("Active");
//        }
//***************************************************************
    
    
    
    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", newLicId);
        }

    if (newLicId) {
        copyOwner(capId, newLicId);
        }

    if (newLicId) {
        copyASITables(capId,newLicId);
        }
    logDebug("Business License Issued");
	}
