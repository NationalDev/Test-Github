/*----------------------------------------------------------------------------------------------------/
| New function getCapExpirationDate
| Function used to update License record with AppName of Application record
| Function called by WTUA;BUSINESSLICENSE!~!~!APPLICATION
| Created by Iman Sallam 07/19/2017; added to DETROIT Includes Custom 07/19/2017
/----------------------------------------------------------------------------------------------------*/
/*
*/


function getCapExpirationDate(itemCap) // option capId
{
    var expDate = null;
    b1ExpResult = aa.expiration.getLicensesByCapID(itemCap);
    if (b1ExpResult.getSuccess()) {
        b1Exp = b1ExpResult.getOutput();
        b1ExpInfo = b1Exp.getB1Expiration();
        expDate = b1ExpInfo.getExpDate();
    }
    return expDate;
}
