/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ApplicationSpecificInfoUpdateAfter
 *
 * Record Type: CodeEnforcement/Inspections/Commercial/NA (Property Inspection)
 * 09/28/2016 Abhishek Jain, FutureNet Group, Inc.  
 */ 

// Custom Field Group - ENFANN_CF	 
// Custom Field Sub Group - ANN_GENERAL, PMB_GENERAL	
// Custom Field Name - Fee Class , Square Ft , Type of Use , Stories	 
// Fee Code - ENFANN_F
// Fee Item Code - ANN005




var SquareFeet = parseInt (AInfo["Commercial Square Ft"]);
var Building = parseInt (AInfo["No. Addl Bldgs"]);
var Fees1 = 0;    // For Sq. Ft - Calculation 1
var Fees2 = 0;    // For Sq. Ft - Calculation 2
var Fees3 = 0;    // For Sq. Ft - Calculation 3
var Fees4 = 0;    // For Sq. Ft - Calculation 4
var ReminderFeet = 0;
var Factor = 0;

if ((AInfo["Fee Class"] == "Church") || (AInfo["Fee Class"] == "Self-Service Laundry") || ( AInfo["Fee Class"] == "Dance Hall") || 
( AInfo["Fee Class"] == "Cabaret") || ( AInfo["Fee Class"] == "Commercial Rec. Bldg") || ( AInfo["Fee Class"] == "Theatre") || 
( AInfo["Fee Class"] == "Public Assembly") || ( AInfo["Fee Class"] == "Institutional Building") || ( AInfo["Fee Class"] == "Hospital") || 
( AInfo["Fee Class"] == "Convalescent Home") || ( AInfo["Fee Class"] == "School") || ( AInfo["Fee Class"] == "College") || 
( AInfo["Fee Class"] == "Dance Studio") || ( AInfo["Fee Class"] == "Factory") || ( AInfo["Fee Class"] == "Commercial") ||
( AInfo["Fee Class"] == "Office Building"))      // Sq. Ft - Calculation 1
{
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees1 = 208;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees1 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees1 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees1 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees1 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees1 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees1 = 402 + ( Factor * 100);
	}
 }
 else if ((AInfo["Fee Class"] == "Group Buildings"))      // For additional Building
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees1 = 208;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees1 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees1 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees1 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees1 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees1 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees1 = 402 + ( Factor * 100);
	}
	Fees1 = Fees1 + ( 134 * Building );
 }
  else if ((AInfo["Fee Class"] == "Parking Lot"))      // For Sq. Ft - Calculation 2
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 10000 ){
	Fees2 = 185;
	}
	else if ( SquareFeet > 10000 && SquareFeet <= 50000 ){
        Fees2 = 210;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ){
		Fees2 = 240;
	} else {
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 100000);
	Fees2 = 240 + ( Factor * 30);
	
	}
 }
 else if ((AInfo["Fee Class"] == "Stripmall"))     // For Sq. Ft - Calculation 3
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees3 = 171;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees3 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees3 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees3 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees3 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees3 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees3 = 402 + ( Factor * 100);
	}
 }
  else if ((AInfo["Fee Class"] == "Junk Yard") || (AInfo["Fee Class"] == "Scrap Yard") || (AInfo["Fee Class"] == "Open Storage Yard"))     // For Sq. Ft - Calculation 4
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees4 = 185;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees4 = 200;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 50000 ){
        Fees4 = 240;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ){
        Fees4 = 320;
	} else {
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 40000);
	Fees4 = 320 + ( Factor * 32);
	}
 }
 
 
 if ( AInfo["Fee Class"] == "Church")
		updateFee("ANN005", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Self-Service Laundry") 
		updateFee("ANN006", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Dance Hall") 
		updateFee("ANN007", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Cabaret") 
		updateFee("ANN008", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Commercial Rec. Bldg") 
		updateFee("ANN009", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Theatre") 
		updateFee("ANN010", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Public Assembly") 
		updateFee("ANN011", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Institutional Building") 
		updateFee("ANN012", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Hospital") 
		updateFee("ANN013", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Convalescent Home") 
		updateFee("ANN014", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "School") 
		updateFee("ANN015", "ENFANN_F", "FINAL", Fees1, "N"); 
	else if ( AInfo["Fee Class"] == "College") 
		updateFee("ANN016", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Dance Studio") 
		updateFee("ANN017", "ENFANN_F", "FINAL", Fees1, "N"); 
	else if ( AInfo["Fee Class"] == "Factory") 
		updateFee("ANN018", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Commercial") 
		updateFee("ANN019", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Office Building") 
		updateFee("ANN020", "ENFANN_F", "FINAL", Fees1, "N");
    else if ( AInfo["Fee Class"] == "Group Buildings") 
		updateFee("ANN021", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Parking Lot") 
		updateFee("ANN022", "ENFANN_F", "FINAL", Fees2, "N");
	else if ( AInfo["Fee Class"] == "Stripmall") 
		updateFee("ANN023", "ENFANN_F", "FINAL", Fees3, "N");
	else if ( AInfo["Fee Class"] == "Junk Yard") 
		updateFee("ANN029", "ENFANN_F", "FINAL", Fees4, "N");
	else if ( AInfo["Fee Class"] == "Scrap Yard") 
		updateFee("ANN030", "ENFANN_F", "FINAL", Fees4, "N");
	else if ( AInfo["Fee Class"] == "Open Storage Yard") 
		updateFee("ANN031", "ENFANN_F", "FINAL", Fees4, "N");

	
	
	
  
 
 
Item1=0;
Item2=0;
Item3=0;
Item4=0;
Item5=0;
Item6=0;
Item7=0;
Item8=0;
Item9=0;
Item10=0;
Item11=0;
Item12=0;
Item13=0;
Item14=0;
Item15=0;
Item16=0;


subTotalItem1=0;
subTotalItem2=0;


signFee4 = 0;
signFee6 = 0;
signFee7 = 0;
signFee8 = 0;
signFee9 = 0;
signFee16 = 0;



if(typeof(SIGN) == "object") {
	for(row in SIGN) {

   if(SIGN[row]["Sign Type"] == "Fixed Awning"){
               Item1= parseInt(SIGN[row]["Quantity"]);
               subTotalItem1+= Item1;

          } else if(SIGN[row]["Sign Type"] == "Fixed/Retractable Awning - Grouped Installations"){
               Item2= parseInt(SIGN[row]["Quantity"]);
			   if(Item2 <= 3)
				   subTotalItem2+= 76;
			   else
               subTotalItem2+= 76 + (( Item2 - 3) * 24) ;

          }
		 else if(SIGN[row]["Sign Type"] == "Sign - Ground Sign"){
              // Item4= parseInt(SIGN[row]["Quantity"]);
              // subTotalItem4+= Item4;
			  var basearea4 = 300,
				basefee4 = 58,
				aditionalarea4 =300,
				additionalfee4 = 58,
			    
				factor4 = 0,
				reminder4 = 0,
			    area4 = 0;
				area4 = parseInt(SIGN[row]["Area"]);

				if (area4 <= basearea4) {
				signFee4 = basefee4;
			} else if (area4 > basearea4) {
				factor4 = parseInt( (area4 - basearea4) / aditionalarea4);
				reminder4 = parseInt((area4 - basearea4) % aditionalarea4);
	
					if (reminder4 > 0) {
					signFee4 = basefee4 + additionalfee4 * (factor4+1);
					} else if (reminder4 == 0) {
						signFee4 = basefee4 + additionalfee4 * factor4;
					}
			}
			

          }  else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphic (Advertising)"){
               //Item6= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem6+= Item6;
			    var basearea6 = 1000,
				basefee6 = 40,
				aditionalarea6 = 1000,
				additionalfee6 = 40,
			    
				factor6 = 0,
				reminder6 = 0,
			    area6 = 0;
				area6 = parseInt(SIGN[row]["Area"]);

				if (area6 <= basearea6) {
				signFee6 = basefee6;
			} else if (area6 > basearea6) {
				factor6 = parseInt( (area6 - basearea6) / aditionalarea6);
				reminder6 = parseInt((area6 - basearea6) % aditionalarea6);
	
					if (reminder6 > 0) {
					signFee6 = basefee6 + additionalfee6 * (factor6+1);
					} else if (reminder6 == 0) {
						signFee6 = basefee6 + additionalfee6 * factor6;
					}
			}
			   

          } else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphics (Business)"){
               //Item7= parseInt(SIGN[row]["Quantity"]);
              // subTotalItem7+= Item7;
			  	var basearea7 = 300,
				basefee7 = 46,
				aditionalarea7 =300,
				additionalfee7 = 46,
			    
				factor7 = 0,
				reminder7 = 0,
			    area7 = 0;
				area7 = parseInt(SIGN[row]["Area"]);

				if (area7 <= basearea7) {
				signFee7 = basefee7;
			} else if (area7 > basearea7) {
				factor7 = parseInt( (area7 - basearea7) / aditionalarea7);
				reminder7 = parseInt((area7 - basearea7) % aditionalarea7);
	
					if (reminder7 > 0) {
					signFee7 = basefee7 + additionalfee7 * (factor7+1);
					} else if (reminder7 == 0) {
						signFee7 = basefee7 + additionalfee7 * factor7;
					}
			}
			

          } else if(SIGN[row]["Sign Type"] == "Sign - Projecting Sign"){
               //Item8= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem8+= Item8;
			    var basearea8 = 32,
				basefee8 = 52,
				aditionalarea8 = 32,
				additionalfee8 = 52,
			    
				factor8 = 0,
				reminder8 = 0,
			    area8 = 0;
				area8 = parseInt(SIGN[row]["Area"]);

				if (area8 <= basearea8) {
				signFee8 = basefee8;
			} else if (area8 > basearea8) {
				factor8 = parseInt( (area8 - basearea8) / aditionalarea8);
				reminder8 = parseInt((area8 - basearea8) % aditionalarea8);
	
					if (reminder8 > 0) {
					signFee8 = basefee8 + additionalfee8 * (factor8+1);
					} else if (reminder8 == 0) {
						signFee8 = basefee8 + additionalfee8 * factor8;
					}
			}

          } else if(SIGN[row]["Sign Type"] == "Sign - Roof Sign"){
               //Item9= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem9+= Item9;
			   var basearea9 = 50,
				basefee9 = 50,
				aditionalarea9 =50,
				additionalfee9 = 50,
			    
				factor9 = 0,
				reminder9 = 0,
			    area9 = 0;
				area9 = parseInt(SIGN[row]["Area"]);

				if (area9 <= basearea9) {
				signFee9 = basefee9;
			} else if (area9 > basearea9) {
				factor9 = parseInt( (area9 - basearea9) / aditionalarea9);
				reminder9 = parseInt((area9 - basearea9) % aditionalarea9);
	
					if (reminder9 > 0) {
					signFee9 = basefee9 + additionalfee9 * (factor9+1);
					} else if (reminder9 == 0) {
						signFee9 = basefee9 + additionalfee9 * factor9;
					}
			}
			

          } 

          

           else if(SIGN[row]["Sign Type"] == "Wall Sign"){ 
               //Item16= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem16+= Item16;
				var basearea16 = 300,
				basefee16 = 46,
				aditionalarea16 = 300,
				additionalfee16 = 46,
			    
				factor16 = 0,
				reminder16 = 0,
			    area16 = 0;
				area16 = parseInt(SIGN[row]["Area"]);

				if (area16 <= basearea16) {
				signFee16 = basefee16;
			} else if (area16 > basearea16) {
				factor16 = parseInt( (area16 - basearea16) / aditionalarea16);
				reminder16 = parseInt((area16 - basearea16) % aditionalarea16);
	
					if (reminder16 > 0) {
					signFee16 = basefee16 + additionalfee16 * (factor16+1);
					} else if (reminder16 == 0) {
						signFee16 = basefee16 + additionalfee16 * factor16;
					}
			}

        }

    
    }
}



 

updateFee("ANN034","ENFANN_F","FINAL",subTotalItem1,"N");
updateFee("ANN035","ENFANN_F","FINAL",subTotalItem2,"N");

updateFee("ANN037","ENFANN_F","FINAL",signFee4,"N");

updateFee("ANN039","ENFANN_F","FINAL",signFee6,"N");
updateFee("ANN040","ENFANN_F","FINAL",signFee7,"N");
updateFee("ANN041","ENFANN_F","FINAL",signFee8,"N");
updateFee("ANN053","ENFANN_F","FINAL",signFee9,"N");

updateFee("ANN046","ENFANN_F","FINAL",signFee16,"N");
	 
