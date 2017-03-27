//WTUA;LICENSES!~!~!APPLICATION.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUA:LICENSES/*/*/APPLICATION
//Contact to RefProf if SubTypeContractorRegistration?

if (wfTask == "License Issuance" && wfStatus == "Issued") {
//->branch("LIC Establish Links to Reference Contacts");
    logDebug("Executing LIC Establish Links to Reference Contacts");
    iArr = new Array();  //attributes to ignore;
    contactTypeArray = new Array("Applicant","Business Owner","Corporate Officer","Director","Manager","Officer","Partner","President","Respondent","Shareholder");
    if (!feeEstimate) {
        createRefContactsFromCapContactsAndLink(capId,contactTypeArray,iArr,false,false,comparePeopleGeneric);
    }
}
    
if (wfTask == "License Issuance" && wfStatus == "Issued") {
//->branch("LIC Issue Business License");
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = "Business";
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        editAppName(getAppSpecific("Doing Business As (DBA) Name"),newLicId);
    }

    appName = getAppName(capId);
    editAppName(appName,newLicId);
    //line added by CIH 03012016;
    var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
    //var ignore = ASICopyExceptions(newLicId);
    var ignoreArr = new Array();
    if(ignore != null) ignoreArr = ignore.split("|");
    copyAppSpecific(newLicId,ignoreArr);
    tmpNewDate = new Date();
    thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
    newExpDate = "12/31/"+thisYear.toString();
    //dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(newExpDate,0));
        thisLic.setStatus("Active");
        }

    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", newLicId);
        }

    if (newLicId) {
        //copyLicensedProf(capId, newLicId);
        copyOwner(capId, newLicId);
        }

    if (newLicId) {
        copyASITables(capId,newLicId);
        }
    
    var parameters = aa.util.newHashMap();
    addParameter(parameters,"Record_ID", newLicIdString);
    addParameter(parameters,"Record_Module", "Licenses");
    var newCap = aa.cap.getCap(newLicId).getOutput();
    var reportUri = generateReport4Workflow(newCap,"License ScriptOut","Licenses",parameters);
    var reportFile = generateReport(newCap,"License ScriptOut","Licenses",parameters);
    
    
    showMessage = true;
    comment(reportUri);
    comment(reportFile);
    
}

if (wfTask == "License Issuance" && wfStatus == "Issued") {


//->branch("EMSE:LicProfLookup");
    logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
    //Issue State;
    LICENSETYPE = "";
    //License Type to be populated;
    licCapId = null;
    isNewLic = false;
    licIDString = null;
    licObj = null;
    licCap = null;

    
//->branch("EMSE:LicProfLookup:getLicenses");
    var searchCap = capId;
    var tmpId = capId;
    var prjArr = null;
    if (appMatch("*/*/*/License")) {
        var childArr = getChildren("*/*/*/Application");
        if(childArr != null) searchCap = childArr[0];
        }

    capId = tmpId;
    var vRelationType = "R";
    if(appMatch("*/*/*/Renewal")) vRelationType="Renewal";
    var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
    if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
    if (prjArr != null) {
        for(prj in prjArr) if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
        }

    if (licCapId == null && appMatch("*/*/*/License")) {
        licCapId = capId;
        //In the event license has no application;
        }

    if (licCapId == null && appMatch("*/*/*/Renewal")) {
        licCapId = capId;
        //In the event license has no application;
        }
    //logDebug("100:licCapId=" + licCapId);
    if (licCapId != null) {
        licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
        }
    //Get License CAP;
    //logDebug("105:licCapId=" + licCapId);
    if (licCapId !=null) {

    
//----->branch("EMSE:LicProfLookup:getLicenseType");
        if (licCapId !=null) {
            licIDString = licCapId.getCustomID();
            }

        if (licCapId !=null) {
            licCap = aa.cap.getCap(licCapId).getOutput();
            licCapType = licCap.getCapType().toString();
            licCapTypeArr = licCapType.split("/");
            licCapStatus = licCap.getCapStatus();
            }

        if (licCapId !=null) {
            LICENSETYPE = getAppSpecific("License Type",licCapId) + "";
            //aa.print("LIC License Type is " + LICENSETYPE);
            }
        stateLicense = getAppSpecific("State License Number",licCapId);
        //aa.print("LIC State License Number is " + stateLicense);
        }
    
    licObj = licenseProfObject(stateLicense ,LICENSETYPE);
    //Get LicArray;
    logDebug("128:stateLicense=" + stateLicense);
    logDebug("129:LICENSETYPE=" + LICENSETYPE);
    if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
        
    
//----->branch("EMSE:LicProfLookup:CreateLP");
        logDebug("Executing EMSE:LicProfLookup:CreateLP");
        var vNewLic = aa.licenseScript.createLicenseScriptModel();
        vNewLic.setAgencyCode(aa.getServiceProviderCode());
        vNewLic.setAuditDate(sysDate);
        vNewLic.setAuditID(currentUserID);
        vNewLic.setAuditStatus("A");
        vNewLic.setLicenseType(LICENSETYPE);
        vNewLic.setLicState(LICENSESTATE);
        vNewLic.setStateLicense(stateLicense);
        aa.licenseScript.createRefLicenseProf(vNewLic);
        var tmpLicObj = licenseProfObject(stateLicense,LICENSETYPE);
        logDebug("148:Successfully created temp LP? " + tmpLicObj.valid);
        if (tmpLicObj.valid) {
            isNewLic = true;
            }
        
        if (tmpLicObj.valid &&licIDString) {
            associatedRefContactWithRefLicProf(licCapId,licObj.refLicModel.getLicSeqNbr(), aa.getServiceProviderCode(),currentUserID);
            }

        var mycap = aa.cap.getCap(capId).getOutput();
        if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
            associatedLicensedProfessionalWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
            }
        licObj = licenseProfObject(stateLicense ,LICENSETYPE );
        logDebug("161:Successfully created LP? " + licObj.valid);

    }
    
        
    if (licObj.valid) {
//----->branch("EMSE:LicProfLookup:UpdateLP");
        logDebug("Executing EMSE:LicProfLookup:UpdateLP");

//----->branch("EMSE:LicProfLookup:UpdateLP:BaseFields");
        logDebug("Executing EMSE:LicProfLookup:UpdateLP:BaseFields");

        licObj.refLicModel.setState(LICENSESTATE);
        licObj.refLicModel.setLicenseBoard(LICENSETYPE);
        licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
        var expObj = null;
        var expDt = null;
        var expObjRes = aa.expiration.getLicensesByCapID(licCapId);
        if(expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
        if (expObj != null) {
            expDt = aa.date.parseDate(expObj.getExpDateString());
        }

        if (expDt != null) {
            licObj.refLicModel.setBusinessLicExpDate(expDt);//Expiration Date
        }

        if (licCapTypeArr[1] == "Business") {
            licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
        }
        else {
            licObj.refLicModel.setLicenseBoard(LICENSETYPE);
        }

        if (licObj.updateFromRecordContactByType(licCapId,"",true,true)) {
            logDebug("LP Updated from Primary Contact");
        }
        else {
            logDebug("LP Failed to Update from Primary Contact trying License Holder");
            if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
            else logDebug("Couldn't Update Contact Info");
        }

        if (getAppSpecific("Doing Business As (DBA) Name")) {
            licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name") );
        }

        if (getAppSpecific("State License Expiration Date")) {
            var expDate = getAppSpecific("State License Expiration Date");
            licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
        }

        licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
        logDebug("BaseFields setBusinessLicense = " +  licCap.getCapModel().getAltID());
        
        
//----->branch("EMSE:LicProfLookup:UpdateLP:ApplicationStatus");
        logDebug("Executing EMSE:LicProfLookup:UpdateLP:ApplicationStatus");
        licObj.refLicModel.setBusinessName2(licCapStatus);
        logDebug("Lic Cap Status: " + licCapStatus);
        if (licObj.updateRecord()) {
            logDebug("LP Updated Successfully");
        }
        else {
            logDebug("LP Update Failed");
            logDebug("licObj is valid? " + licObj.valid);
            var res = aa.licenseScript.editRefLicenseProf(licObj.refLicModel);
            var succ = res.getSuccess();
            logDebug("editRefLicenseProf() " + succ);

            createRefLicProf(stateLicense,LICENSETYPE,"Applicant");
            var newLicProf = getRefLicenseProf(stateLicense);
            newLicProf.setLicenseIssueDate(licCap.getFileDate());
            newLicProf.setLicenseBoard(LICENSETYPE);
            newLicProf.setLicenseExpirationDate(aa.date.parseDate(expDate));
            newLicProf.setBusinessLicense(licCap.getCapModel().getAltID());
            newLicProf.setBusinessName2(licCapStatus);
            LPUpdateResult = aa.licenseScript.editRefLicenseProf(newLicProf);
            logDebug("LP Update Result = " + LPUpdateResult.getSuccess());
        }
    }
    else {
        logDebug("LP Not found to update");
        //createRefLicProfFromLicProf();
    }

}

//var checkLicProf = getRefLicenseProf(stateLicense);
//if (newLicProf.valid){
//    aa.print("newLicProf is a " + newLicProf.getClass());
//    for (x in newLicProf) if (typeof(newLicProf[x]) == "function") aa.print("  " + x);
//    for (x in newLicProf) if (typeof(newLicProf[x]) != "function") aa.print("  " + x + " = " + newLicProf[x]);
//}
