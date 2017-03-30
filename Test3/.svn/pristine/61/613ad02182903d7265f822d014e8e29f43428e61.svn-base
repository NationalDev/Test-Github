//WTUA;LICENSES!~!~!RENEWAL.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUA:LICENSES/*/*/RENEWAL
//Contact to RefProf if SubTypeContractorRegistration?

if ((wfTask == "License Issuance" || wfTask == "Registration Renewal") && (wfStatus == "Renewed" || wfStatus == "Approved")) {
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
    //result = WorkflowTaskUpdateAfter4Renew();
/*    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = getParentCapID4Renewal();
    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    // create the permit record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        setLicExpirationDate(newLicId,null,tmpNewDate);
        updateAppStatus("Active","",newLicId);
        copyAppSpecific(newLicId,"");
        //copyLicensedProf(capId,newLicId);
    }
*/
}

if ((wfTask == "License Issuance" || wfTask == "Registration Renewal") && wfStatus == "Renewed") {
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

    if (licCapId != null) {
        licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
        }
    //Get License CAP;
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
            LICENSETYPE = getAppSpecific("License Type",licCapId)+"";
            }
        stateLicense = getAppSpecific("State License Number",licCapId);
        }

    licObj = licenseProfObject(stateLicense ,LICENSETYPE);
    //Get LicArray;
    if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
//----->branch("EMSE:LicProfLookup:CreateLP");
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
        }

    if (licObj.valid) {
//----->branch("EMSE:LicProfLookup:UpdateLP");
//----->branch("EMSE:LicProfLookup:UpdateLP:BaseFields");
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
            licObj.refLicModel.setBusinessLicExpDate(expDt);
            //Expiration Date;
            }

        if (licCapTypeArr[1] == "Business") {
            licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
            } else {
            licObj.refLicModel.setLicenseBoard(LICENSETYPE);
            }

        if (licObj.updateFromRecordContactByType(licCapId,"",true,true)) {
            logDebug("LP Updated from Primary Contact");
            } else {
            logDebug("LP Failed to Update from Primary Contact trying License Holder");
            if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
            else logDebug("Couldn't Update Contact Info");
            }

        if (getAppSpecific("Doing Business As (DBA) Name",licCapId)) {
            licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name",licCapId) );
            }

        if (getAppSpecific("State License Expiration Date",licCapId)) {
            var expDate = getAppSpecific("State License Expiration Date",licCapId);
            licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
            }

        licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
        logDebug("BaseFields setBusinessLicense =" +  licCap.getCapModel().getAltID());
//----->branch("EMSE:LicProfLookup:UpdateLP:ApplicationStatus");
        licObj.refLicModel.setBusinessName2(licCapStatus);
        logDebug("Lic Cap Status: " + licCapStatus);
        if (licObj.updateRecord()) {
            logDebug("LP Updated Successfully");
            } else {
            logDebug("LP Update Failed");
            }
        }
    else {
        logDebug("LP Not found to update");
        //createRefLicProfFromLicProf();
    }
}

    