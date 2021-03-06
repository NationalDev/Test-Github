// Standard Choices
// 1 - LIC Issue Business License
// 2 - LIC Establish Links to Reference Contacts
// Issue the business license by doing the following:  Create the license record,  expiration date and status. 
// Ensure that all Record contacts are based on reference contacts.  
// These are called by the WTUA:Licenses/Business(Contractor)/*/Application BPT script.
// Accela 2/8/2016 - Also called by the WTUA:BUSINESSLICENSE/*/*/APPLICATION script for CoD
// EMSE 3.0
//WTUA:BUSINESSLICENSE/*/*/APPLICATION script
//WTUA;BUSINESSLICENSE!~!~!APPLICATION
//showDebug = true, showMessage = true;
if (wfTask == "License Issuance" && wfStatus == "Issued") { 	//Status on businesslicense Application record to trigger creation of parent License record
	//branch("LIC Establish Links to Reference Contacts"); 		// May not be needed on BusinessLicense 
	//branch("LIC Issue Business License");						//added line 04 to this SC to getAppName from Application record and copy to parent Liceense record
	newLic = null;
    newLicId = null;
    newLicIdString = null;
//    newLicenseType = "Business";
      
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
   
    var myCapId = capIDString;
    var capId = aa.cap.getCapID(myCapId).getOutput();
    
    
    
    // create the license record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
//       editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
        }
    
//************************************************************************************************
    
    var myCapId = "ALTID"
    	var capId = aa.cap.getCapID(myCapId).getOutput();

    	b1ExpResult = aa.expiration.getLicensesByCapID(capId )
    	if (b1ExpResult.getSuccess())
    	{
    	 var b1Exp = b1ExpResult.getOutput();
    	 var expDate = b1Exp.getExpDate();
    	 aa.print("Expiration Date: " + expDate.getMonth() + "/" + expDate.getDayOfMonth() + "/" + expDate.getYear());
    	 aa.print("Expiration Status: " + b1Exp.getExpStatus());

    	}
    	else
    	{ 
    	 aa.print("**ERROR: Getting B1Expiration Object for Cap.  Reason is: " + b1ExpResult.getErrorType() + ":" + b1ExpResult.getErrorMessage()) ; 
    	}

    
    
    
    
    
//*************************************************************************************************    
    
//    appName = getAppName(capId);
//    editAppName(appName,newLicId);
    //line added by CIH 03012016;
    //var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
//    var ignore = ASICopyExceptions(newLicId);
 //   var ignoreArr = new Array();
  //  if(ignore != null) ignoreArr = ignore.split("|");
  //  copyAppSpecific(newLicId,ignoreArr);
 //   tmpNewDate = dateAddMonths(null, monthsToInitialExpire);

    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);

     
        
        b1ExpResult = aa.expiration.getLicensesByCapID(capId);
        
        
        var b1Exp = b1ExpResult.getOutput();
        var expDate = b1Exp.getExpDate();
        
        thisLic.setExpiration(expDate);
        
        
      
        thisLic.setStatus("Active");
        }
    
    
//    logDebug("expDate" + expDate);
    
    
    
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
