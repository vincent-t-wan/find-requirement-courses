const {
	text
} = require("express");
const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
var start = 0; // start of text
var output = "";
// BCS REQUIREMENT CONSTANTS
var CSCourseNumberReqs1 = [115, -1, -1, -1, -1, -1, -1, -1, -1];
var CSCourseNumberReqs2 = [135, 136, 240, 241, 245, 246, 251, 341, 350];
var CSCourseNumberReqs3 = [145, 146, -1, -1, -1, -1, -1, -1, -1];
var CS340to398 = 3;
var CS440to489 = 2;
var CSLastCheckbox = 1;
var CSUnitReq = 7.5;
var CSCoursesTaken = [];
var MATHCourseNumberReqs1 = [-1, -1, 127, 128, -1];
var MATHCourseNumberReqs2 = [135, 136, 137, 138, 239];
var MATHCourseNumberReqs3 = [145, 146, 147, 148, 249];
var MATHCoursesTaken = [];
var STATCourseNumberReqs1 = [230, 231];
var STATCourseNumberReqs2 = [240, 241];
var STATCoursesTaken = [];
var MATHUnitReq = 3.5;
var TakenCommList1 = false;
var TakenCommList2 = false;
var NonMathUnitReq = 5.0;
var AdditionalUnitReq = 4.0;
var COCoursesTaken = [];
var EMLSCoursesTaken = [];
var ENGLCoursesTaken = [];
var SPCOMCoursesTaken = [];
var MTHELCoursesTaken = [];
var AFMCoursesTaken = [];
var ANTHCoursesTaken = [];
var APPLSCoursesTaken = [];
var ARBUSCoursesTaken = [];
var BETCoursesTaken = [];
var BUSCoursesTaken = [];
var COMMCoursesTaken = [];
var ECONCoursesTaken = [];
var ENBUSCoursesTaken = [];
var GBDACoursesTaken = [];
var GEOGCoursesTaken = [];
var GERONCoursesTaken = [];
var HRMCoursesTaken = [];
var INDEVCoursesTaken = [];
var INTEGCoursesTaken = [];
var INTSTCoursesTaken = [];
var ISSCoursesTaken = [];
var LSCoursesTaken = [];
var NATSTCoursesTaken = [];
var PACSCoursesTaken = [];
var PSCICoursesTaken = [];
var PSYCHCoursesTaken = [];
var RECCoursesTaken = [];
var SDSCoursesTaken = [];
var SMFCoursesTaken = [];
var SOCCoursesTaken = [];
var SOCWKCoursesTaken = [];
var STVCoursesTaken = [];
var SWRENCoursesTaken = [];
var WSCoursesTaken = [];
var MOHAWKCoursesTaken = [];
var ARABICCoursesTaken = [];
var ASLCoursesTaken = [];
var CDNSTCoursesTaken = [];
var GSJCoursesTaken = [];
var INTTSCoursesTaken = [];
var FillElectives = 2;
var SocialElectives = 2;
var PureCourses = 1;
var BIOLCoursesTaken = [];
var CHEMCoursesTaken = [];
var EARTHCoursesTaken = [];
var PHYSCoursesTaken = [];
var SCICoursesTaken = [];
var AppliedCourses = 1;
var AHSCoursesTaken = [];
var ARCHCoursesTaken = [];
var AVIACoursesTaken = [];
var ENVSCoursesTaken = [];
var ERSCoursesTaken = [];
var HLTHCoursesTaken = [];
var KINCoursesTaken = [];
var MNSCoursesTaken = [];
var OPTOMCoursesTaken = [];
var PLANCoursesTaken = [];
var HumanityCourse1 = 1;
var HumanityCourseSpecial = 1;
var ARTSCoursesTaken = [];
var CHINACoursesTaken = [];
var CLASCoursesTaken = [];
var CMWCoursesTaken = [];
var CROATCoursesTaken = [];
var DACCoursesTaken = [];
var DRAMACoursesTaken = [];
var DUTCHCoursesTaken = [];
var EASIACoursesTaken = [];
var FINECoursesTaken = [];
var FRCoursesTaken = [];
var GERCoursesTaken = [];
var GRKCoursesTaken = [];
var HISTCoursesTaken = [];
var HUMSCCoursesTaken = [];
var ITALCoursesTaken = [];
var ITALSTCoursesTaken = [];
var JAPANCoursesTaken = [];
var JSCoursesTaken = [];
var KOREACoursesTaken = [];
var LATCoursesTaken = [];
var MEDVLCoursesTaken = [];
var MUSICCoursesTaken = [];
var PHILCoursesTaken = [];
var POLSHCoursesTaken = [];
var PORTCoursesTaken = [];
var REESCoursesTaken = [];
var RSCoursesTaken = [];
var RUSSCoursesTaken = [];
var SICoursesTaken = [];
var SPANCoursesTaken = [];
var VCULTCoursesTaken = [];
var ACTSCCoursesTaken = [];
var AMATHCoursesTaken = [];
var CHECoursesTaken = [];
var CIVECoursesTaken = [];
var CMCoursesTaken = [];
var COOPCoursesTaken = [];
var ECECoursesTaken = [];
var ENVECoursesTaken = [];
var ESLCoursesTaken = [];
var GENECoursesTaken = [];
var GEOECoursesTaken = [];
var ISCoursesTaken = [];
var MATBUSCoursesTaken = [];
var MECoursesTaken = [];
var MSCICoursesTaken = [];
var MTECoursesTaken = [];
var NECoursesTaken = [];
var PDCoursesTaken = [];
var PMATHCoursesTaken = [];
var SCBUSCoursesTaken = [];
var SECoursesTaken = [];
var SYDECoursesTaken = [];
var UNIVCoursesTaken = [];
var WKRPTCoursesTaken = [];
var BMECoursesTaken = [];
var BASECoursesTaken = [];
var EFACoursesTaken = [];
var THPERFCoursesTaken = [];
var INDGCoursesTaken = [];
var COOPReqs = 6;
var WKRPTsLeft = 4;
var TookPD1 = false;
var TookPD11 = false;
var TookPD10 = false;
var NumPDCourses = 5;
var DepthSatisfied = false;

function DepthCheck(arr) {
	for (let i = 0; i < arr.length; ++i) {
		if ((arr.length >= 3) && (arr[i] >= 300)) {
			DepthSatisfied = true;
		}
	}
}

function extractTakenCourses(txt) {
	while (start !== -1) {
		// we find the appropriate course subject corresponding to the text
		// finds the appropriate course using the whitespace after it
		if (txt.substr(start + 1, 6).split(" ")[0] == 'AFM') { // AFM 
			const end = txt.indexOf('\n', start + 1);
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') {
				if (!AFMCoursesTaken.includes(coursenum)) {
					AFMCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!AFMCoursesTaken.includes(coursenum)) {
						AFMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!AFMCoursesTaken.includes(coursenum)) {
						AFMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'IS') {
			const end = txt.indexOf('\n', start + 1);
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ISCoursesTaken.includes(coursenum)) {
					ISCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ISCoursesTaken.includes(coursenum)) {
						ISCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!ISCoursesTaken.includes(coursenum)) {
						ISCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ACTSC') { // ACTSC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ACTSCCoursesTaken.includes(coursenum)) {
					ACTSCCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ACTSCCoursesTaken.includes(coursenum)) {
						ACTSCCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!ACTSCCoursesTaken.includes(coursenum)) {
						ACTSCCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ASL') { // ASL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ASLCoursesTaken.includes(coursenum)) {
					ASLCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ASLCoursesTaken.includes(coursenum)) {
						ASLCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ASLCoursesTaken.includes(coursenum)) {
						ASLCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ANTH') { // ANTH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ANTHCoursesTaken.includes(coursenum)) {
					ANTHCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ANTHCoursesTaken.includes(coursenum)) {
						ANTHCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ANTHCoursesTaken.includes(coursenum)) {
						ANTHCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'AHS') { // AHS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!AHSCoursesTaken.includes(coursenum)) {
					AHSCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!AHSCoursesTaken.includes(coursenum)) {
						AHSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!AHSCoursesTaken.includes(coursenum)) {
						AHSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'APPLS') { // APPLS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!APPLSCoursesTaken.includes(coursenum)) {
					APPLSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!APPLSCoursesTaken.includes(coursenum)) {
						APPLSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!APPLSCoursesTaken.includes(coursenum)) {
						APPLSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'AMATH') { // AMATH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!AMATHCoursesTaken.includes(coursenum)) {
					AMATHCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!AMATHCoursesTaken.includes(coursenum)) {
						AMATHCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!AMATHCoursesTaken.includes(coursenum)) {
						AMATHCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ARABIC') { // ARABIC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ARABICCoursesTaken.includes(coursenum)) {
					ARABICCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ARABICCoursesTaken.includes(coursenum)) {
						ARABICCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ARABICCoursesTaken.includes(coursenum)) {
						ARABICCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ARCH') { // ARCH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ARCHCoursesTaken.includes(coursenum)) {
					ARCHCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ARCHCoursesTaken.includes(coursenum)) {
						ARCHCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ARCHCoursesTaken.includes(coursenum)) {
						ARCHCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ARTS') { // ARTS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ARTSCoursesTaken.includes(coursenum)) {
					ARTSCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ARTSCoursesTaken.includes(coursenum)) {
						ARTSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ARTSCoursesTaken.includes(coursenum)) {
						ARTSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ARBUS') { // ARBUS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ARBUSCoursesTaken.includes(coursenum)) {
					ARBUSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ARBUSCoursesTaken.includes(coursenum)) {
						ARBUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ARBUSCoursesTaken.includes(coursenum)) {
						ARBUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'AVIA') { // AVIA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!AVIACoursesTaken.includes(coursenum)) {
					AVIACoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!AVIACoursesTaken.includes(coursenum)) {
						AVIACoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!AVIACoursesTaken.includes(coursenum)) {
						AVIACoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'BIOL') { // BIOL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!BIOLCoursesTaken.includes(coursenum)) {
					BIOLCoursesTaken.push(coursenum);
					if (PureCourses > 0) {
						PureCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!BIOLCoursesTaken.includes(coursenum)) {
						BIOLCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!BIOLCoursesTaken.includes(coursenum)) {
						BIOLCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'BME') { // BME
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!BMECoursesTaken.includes(coursenum)) {
					BMECoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!BMECoursesTaken.includes(coursenum)) {
						BMECoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!BMECoursesTaken.includes(coursenum)) {
						BMECoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'BASE') { // BASE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!BASECoursesTaken.includes(coursenum)) {
					BASECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!BASECoursesTaken.includes(coursenum)) {
						BASECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!BASECoursesTaken.includes(coursenum)) {
						BASECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'EFAS') { // EFAS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!EFASCoursesTaken.includes(coursenum)) {
					EFASCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!EFASCoursesTaken.includes(coursenum)) {
						EFASCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!EFASCoursesTaken.includes(coursenum)) {
						EFASCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'BUS') { // BUS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!BUSCoursesTaken.includes(coursenum)) {
					BUSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!BUSCoursesTaken.includes(coursenum)) {
						BUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!BUSCoursesTaken.includes(coursenum)) {
						BUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'BET') { // BET
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!BETCoursesTaken.includes(coursenum)) {
					BETCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!BETCoursesTaken.includes(coursenum)) {
						BETCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!BETCoursesTaken.includes(coursenum)) {
						BETCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CDNST') { // CDNST
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CDNSTCoursesTaken.includes(coursenum)) {
					CDNSTCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CDNSTCoursesTaken.includes(coursenum)) {
						CDNSTCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!CDNSTCoursesTaken.includes(coursenum)) {
						CDNSTCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CHE') { // CHE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CHECoursesTaken.includes(coursenum)) {
					CHECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CHECoursesTaken.includes(coursenum)) {
						CHECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!CHECoursesTaken.includes(coursenum)) {
						CHECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CHEM') { // CHEM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CHEMCoursesTaken.includes(coursenum)) {
					CHEMCoursesTaken.push(coursenum);
					if (PureCourses > 0) {
						PureCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CHEMCoursesTaken.includes(coursenum)) {
						CHEMCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!CHEMCoursesTaken.includes(coursenum)) {
						CHEMCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CHINA') { // CHINA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CHINACoursesTaken.includes(coursenum)) {
					CHINACoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CHINACoursesTaken.includes(coursenum)) {
						CHINACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!CHINACoursesTaken.includes(coursenum)) {
						CHINACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CM') { // CM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CMCoursesTaken.includes(coursenum)) {
					CMCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CMCoursesTaken.includes(coursenum)) {
						CMCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!CMCoursesTaken.includes(coursenum)) {
						CMCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CMW') { // CMW
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CMWCoursesTaken.includes(coursenum)) {
					CMWCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CMWCoursesTaken.includes(coursenum)) {
						CMWCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!CMWCoursesTaken.includes(coursenum)) {
						CMWCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CIVE') { // CIVE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CIVECoursesTaken.includes(coursenum)) {
					CIVECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CIVECoursesTaken.includes(coursenum)) {
						CIVECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!CIVECoursesTaken.includes(coursenum)) {
						CIVECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CLAS') { // CLAS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CLASCoursesTaken.includes(coursenum)) {
					CLASCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CLASCoursesTaken.includes(coursenum)) {
						CLASCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!CLASCoursesTaken.includes(coursenum)) {
						CLASCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CO') { // CO
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!COCoursesTaken.includes(coursenum)) {
					COCoursesTaken.push(coursenum);
					if (coursenum == 487) {
						if (CSLastCheckbox > 0) {
							CSLastCheckbox -= 1;
							CSUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!COCoursesTaken.includes(coursenum)) {
						COCoursesTaken.push(coursenum);
						if (coursenum == 487) {
							if (CSLastCheckbox > 0) {
								CSLastCheckbox -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!COCoursesTaken.includes(coursenum)) {
						COCoursesTaken.push(coursenum);
						if (coursenum == 487) {
							if (CSLastCheckbox > 0) {
								CSLastCheckbox -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'COMM') { // COMM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!COMMCoursesTaken.includes(coursenum)) {
					COMMCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!COMMCoursesTaken.includes(coursenum)) {
						COMMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!COMMCoursesTaken.includes(coursenum)) {
						COMMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CS') { // CS
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var foundclass = false;
			for (let i = 0;
				((i < CSCourseNumberReqs1.length) && !foundclass); ++i) {
				if ((CSCourseNumberReqs1[i] == coursenum) || (CSCourseNumberReqs2[i] == coursenum) || (CSCourseNumberReqs3[i] == coursenum)) {
					foundclass = true;
					if (txt.substr(end - 3, 3) === '100') { 
						if (!CSCoursesTaken.includes(coursenum)) {
							CSCoursesTaken.push(coursenum);
							CSCourseNumberReqs1.splice(i, 1);
							CSCourseNumberReqs2.splice(i, 1);
							CSCourseNumberReqs3.splice(i, 1);
							CSUnitReq -= 0.5;
						}
					} else if (isNaN(grade)) {
						if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
							if (!CSCoursesTaken.includes(coursenum)) {
								CSCoursesTaken.push(coursenum);
								CSCourseNumberReqs1.splice(i, 1);
								CSCourseNumberReqs2.splice(i, 1);
								CSCourseNumberReqs3.splice(i, 1);
								CSUnitReq -= 0.5;
							}
						}
					} else {
						if (grade >= 50) {
							if (!CSCoursesTaken.includes(coursenum)) {
								CSCoursesTaken.push(coursenum);
								CSCourseNumberReqs1.splice(i, 1);
								CSCourseNumberReqs2.splice(i, 1);
								CSCourseNumberReqs3.splice(i, 1);
								CSUnitReq -= 0.5;
							}
						}
					}
				}
			}
			if (!foundclass) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!CSCoursesTaken.includes(coursenum)) {
						CSCoursesTaken.push(coursenum);
						if ((coursenum >= 340) && (coursenum <= 398)) {
							if (CS340to398 > 0) {
								CS340to398 -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else if ((coursenum >= 440) && (coursenum <= 489)) {
							if (CS440to489 > 0) {
								CS440to489 -= 1;
								CSUnitReq -= 0.5;
							} else if (CS340to398 > 0) {
								CS340to398 -= 1;
								CSUnitReq -= 0.5;
							} else if (CSLastCheckbox) {
								CSLastCheckbox -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else if (((coursenum >= 490) && (coursenum <= 498)) || ((coursenum == 499) && (txt.substr(start + 8, 1) == 'T')) ||
							((coursenum >= 600) && (coursenum <= 799))) {
							if (CSLastCheckbox > 0) {
								CSLastCheckbox -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!CSCoursesTaken.includes(coursenum)) {
							CSCoursesTaken.push(coursenum);
							if ((coursenum >= 340) && (coursenum <= 398)) {
								if (CS340to398 > 0) {
									CS340to398 -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else if ((coursenum >= 440) && (coursenum <= 489)) {
								if (CS440to489 > 0) {
									CS440to489 -= 1;
									CSUnitReq -= 0.5;
								} else if (CS340to398 > 0) {
									CS340to398 -= 1;
									CSUnitReq -= 0.5;
								} else if (CSLastCheckbox) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else if (((coursenum >= 490) && (coursenum <= 498)) || ((coursenum == 499) && (txt.substr(start + 8, 1) == 'T')) ||
								((coursenum >= 600) && (coursenum <= 799))) {
								if (CSLastCheckbox > 0) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!CSCoursesTaken.includes(coursenum)) {
							CSCoursesTaken.push(coursenum);
							if ((coursenum >= 340) && (coursenum <= 398)) {
								if (CS340to398 > 0) {
									CS340to398 -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else if ((coursenum >= 440) && (coursenum <= 489)) {
								if (CS440to489 > 0) {
									CS440to489 -= 1;
									CSUnitReq -= 0.5;
								} else if (CS340to398 > 0) {
									CS340to398 -= 1;
									CSUnitReq -= 0.5;
								} else if (CSLastCheckbox) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else if (((coursenum >= 490) && (coursenum <= 498)) || ((coursenum == 499) && (txt.substr(start + 8, 1) == 'T')) ||
								((coursenum >= 600) && (coursenum <= 799))) {
								if (CSLastCheckbox > 0) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'COOP') { // COOP
			// WIP WIP WIP
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 1), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!COOPCoursesTaken.includes(coursenum)) {
					COOPCoursesTaken.push(coursenum);
					COOPReqs -= 1;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!COOPCoursesTaken.includes(coursenum)) {
						COOPCoursesTaken.push(coursenum);
						COOPReqs -= 1;
					}
				}
			} else {
				if (grade >= 50) {
					if (!COOPCoursesTaken.includes(coursenum)) {
						COOPCoursesTaken.push(coursenum);
						COOPReqs -= 1;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'CROAT') { // CROAT
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!CROATCoursesTaken.includes(coursenum)) {
					CROATCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!CROATCoursesTaken.includes(coursenum)) {
						CROATCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!CROATCoursesTaken.includes(coursenum)) {
						CROATCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'DAC') { // DAC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!DACCoursesTaken.includes(coursenum)) {
					DACCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!DACCoursesTaken.includes(coursenum)) {
						DACCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!DACCoursesTaken.includes(coursenum)) {
						DACCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'DUTCH') { // DUTCH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!DUTCHCoursesTaken.includes(coursenum)) {
					DUTCHCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!DUTCHCoursesTaken.includes(coursenum)) {
						DUTCHCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!DUTCHCoursesTaken.includes(coursenum)) {
						DUTCHCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'DRAMA') { // DRAMA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!DRAMACoursesTaken.includes(coursenum)) {
					DRAMACoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!DRAMACoursesTaken.includes(coursenum)) {
						DRAMACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!DRAMACoursesTaken.includes(coursenum)) {
						DRAMACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'EARTH') { // EARTH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!EARTHCoursesTaken.includes(coursenum)) {
					EARTHCoursesTaken.push(coursenum);
					if (PureCourses > 0) {
						PureCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!EARTHCoursesTaken.includes(coursenum)) {
						EARTHCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!EARTHCoursesTaken.includes(coursenum)) {
						EARTHCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'EASIA') { // EASIA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!EASIACoursesTaken.includes(coursenum)) {
					EASIACoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!EASIACoursesTaken.includes(coursenum)) {
						EASIACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!EASIACoursesTaken.includes(coursenum)) {
						EASIACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ECON') { // ECON
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ECONCoursesTaken.includes(coursenum)) {
					ECONCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ECONCoursesTaken.includes(coursenum)) {
						ECONCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ECONCoursesTaken.includes(coursenum)) {
						ECONCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ECE') { // ECE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ECECoursesTaken.includes(coursenum)) {
					ECECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ECECoursesTaken.includes(coursenum)) {
						ECECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!ECECoursesTaken.includes(coursenum)) {
						ECECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ENGL') { // ENGL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if ((txt.substr(start + 7, 3) === '109') || (txt.substr(start + 7, 4) === '129R')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!ENGLCoursesTaken.includes(coursenum)) {
						ENGLCoursesTaken.push(coursenum);
						if (!TakenCommList1) {
							TakenCommList1 = true;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AdditionalUnitReq > 0) {
							AdditionalUnitReq -= 0.5;
						} else if (!TakenCommList2) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				}
				///
			} else if ((txt.substr(start + 7, 4) === '101B') || (txt.substr(start + 7, 4) === '108B') || (txt.substr(start + 7, 4) === '108D') || (txt.substr(start + 7, 3) === '119') || (txt.substr(start + 7, 4) === '208B') || (txt.substr(start + 7, 3) === '209') || (txt.substr(start + 7, 4) === '210E') || (txt.substr(start + 7, 4) === '210F') || (txt.substr(start + 7, 3) === '378')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!ENGLCoursesTaken.includes(coursenum)) {
						ENGLCoursesTaken.push(coursenum);
						if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
							TakenCommList2 = true;
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 1;
						} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			} else {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!ENGLCoursesTaken.includes(coursenum)) {
						ENGLCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourseSpecial > 0) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!ENGLCoursesTaken.includes(coursenum)) {
							ENGLCoursesTaken.push(coursenum);
							if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourseSpecial > 0) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'EMLS') { // EMLS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if ((txt.substr(start + 7, 4) === '101R') || (txt.substr(start + 7, 4) === '102R') || (txt.substr(start + 7, 4) === '129R')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!EMLSCoursesTaken.includes(coursenum)) {
						EMLSCoursesTaken.push(coursenum);
						if (!TakenCommList1) {
							TakenCommList1 = true;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AdditionalUnitReq > 0) {
							AdditionalUnitReq -= 0.5;
						} else if (!TakenCommList2) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				}
				///
			} else if ((txt.substr(start + 7, 4) === '103R') || (txt.substr(start + 7, 4) === '104R') || (txt.substr(start + 7, 4) === '110R')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!EMLSCoursesTaken.includes(coursenum)) {
						EMLSCoursesTaken.push(coursenum);
						if (!TakenCommList2) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			} else {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!EMLSCoursesTaken.includes(coursenum)) {
						EMLSCoursesTaken.push(coursenum);
						if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!EMLSCoursesTaken.includes(coursenum)) {
							EMLSCoursesTaken.push(coursenum);
							if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ENBUS') { // ENBUS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ENBUSCoursesTaken.includes(coursenum)) {
					ENBUSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ENBUSCoursesTaken.includes(coursenum)) {
						ENBUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ENBUSCoursesTaken.includes(coursenum)) {
						ENBUSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ERS') { // ERS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ERSCoursesTaken.includes(coursenum)) {
					ERSCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ERSCoursesTaken.includes(coursenum)) {
						ERSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ERSCoursesTaken.includes(coursenum)) {
						ERSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ENVE') { // ENVE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ENVECoursesTaken.includes(coursenum)) {
					ENVECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ENVECoursesTaken.includes(coursenum)) {
						ENVECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!ENVECoursesTaken.includes(coursenum)) {
						ENVECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ENVS') { // ENVS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ENVSCoursesTaken.includes(coursenum)) {
					ENVSCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ENVSCoursesTaken.includes(coursenum)) {
						ENVSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ENVSCoursesTaken.includes(coursenum)) {
						ENVSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'FINE') { // FINE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!FINECoursesTaken.includes(coursenum)) {
					FINECoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!FINECoursesTaken.includes(coursenum)) {
						FINECoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!FINECoursesTaken.includes(coursenum)) {
						FINECoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'FR') { // FR
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!FRCoursesTaken.includes(coursenum)) {
					FRCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!FRCoursesTaken.includes(coursenum)) {
						FRCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!FRCoursesTaken.includes(coursenum)) {
						FRCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GENE') { // GENE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GENECoursesTaken.includes(coursenum)) {
					GENECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GENECoursesTaken.includes(coursenum)) {
						GENECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!GENECoursesTaken.includes(coursenum)) {
						GENECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GEOG') { // GEOG
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GEOGCoursesTaken.includes(coursenum)) {
					GEOGCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GEOGCoursesTaken.includes(coursenum)) {
						GEOGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GEOGCoursesTaken.includes(coursenum)) {
						GEOGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GEOE') { // GEOE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GEOECoursesTaken.includes(coursenum)) {
					GEOECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GEOECoursesTaken.includes(coursenum)) {
						GEOECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!GEOECoursesTaken.includes(coursenum)) {
						GEOECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GER') { // GER
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GERCoursesTaken.includes(coursenum)) {
					GERCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GERCoursesTaken.includes(coursenum)) {
						GERCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GERCoursesTaken.includes(coursenum)) {
						GERCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GERON') { // GERON
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GERONCoursesTaken.includes(coursenum)) {
					GERONCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GERONCoursesTaken.includes(coursenum)) {
						GERONCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GERONCoursesTaken.includes(coursenum)) {
						GERONCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GBDA') { // GBDA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GBDACoursesTaken.includes(coursenum)) {
					GBDACoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GBDACoursesTaken.includes(coursenum)) {
						GBDACoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GBDACoursesTaken.includes(coursenum)) {
						GBDACoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GRK') { // GRK
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GRKCoursesTaken.includes(coursenum)) {
					GRKCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GRKCoursesTaken.includes(coursenum)) {
						GRKCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GRKCoursesTaken.includes(coursenum)) {
						GRKCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'HLTH') { // HLTH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!HLTHCoursesTaken.includes(coursenum)) {
					HLTHCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!HLTHCoursesTaken.includes(coursenum)) {
						HLTHCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!HLTHCoursesTaken.includes(coursenum)) {
						HLTHCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'HIST') { // HIST
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!HISTCoursesTaken.includes(coursenum)) {
					HISTCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!HISTCoursesTaken.includes(coursenum)) {
						HISTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!HISTCoursesTaken.includes(coursenum)) {
						HISTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'HRM') { // HRM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!HRMCoursesTaken.includes(coursenum)) {
					HRMCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!HRMCoursesTaken.includes(coursenum)) {
						HRMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!HRMCoursesTaken.includes(coursenum)) {
						HRMCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'INDG') { // INDG
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!INDGCoursesTaken.includes(coursenum)) {
					INDGCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!INDGCoursesTaken.includes(coursenum)) {
						INDGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!INDGCoursesTaken.includes(coursenum)) {
						INDGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'GSJ') { // GSJ
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!GSJCoursesTaken.includes(coursenum)) {
					GSJCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!GSJCoursesTaken.includes(coursenum)) {
						GSJCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!GSJCoursesTaken.includes(coursenum)) {
						GSJCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'HUMSC') { // HUMSC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!HUMSCCoursesTaken.includes(coursenum)) {
					HUMSCCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!HUMSCCoursesTaken.includes(coursenum)) {
						HUMSCCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!HUMSCCoursesTaken.includes(coursenum)) {
						HUMSCCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'INDEV') { // INDEV
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!INDEVCoursesTaken.includes(coursenum)) {
					INDEVCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!INDEVCoursesTaken.includes(coursenum)) {
						INDEVCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!INDEVCoursesTaken.includes(coursenum)) {
						INDEVCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ISS') {
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ISSCoursesTaken.includes(coursenum)) {
					ISSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ISSCoursesTaken.includes(coursenum)) {
						ISSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ISSCoursesTaken.includes(coursenum)) {
						ISSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'INTST') { // INTST
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!INTSTCoursesTaken.includes(coursenum)) {
					INTSTCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!INTSTCoursesTaken.includes(coursenum)) {
						INTSTCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!INTSTCoursesTaken.includes(coursenum)) {
						INTSTCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'INTTS') { // INTTS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!INTTSCoursesTaken.includes(coursenum)) {
					INTTSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!INTTSCoursesTaken.includes(coursenum)) {
						INTTSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!INTTSCoursesTaken.includes(coursenum)) {
						INTTSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ITAL') { // ITAL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ITALCoursesTaken.includes(coursenum)) {
					ITALCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ITALCoursesTaken.includes(coursenum)) {
						ITALCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ITALCoursesTaken.includes(coursenum)) {
						ITALCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ITALST') { // ITALST
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ITALSTCoursesTaken.includes(coursenum)) {
					ITALSTCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ITALSTCoursesTaken.includes(coursenum)) {
						ITALSTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!ITALSTCoursesTaken.includes(coursenum)) {
						ITALSTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'JAPAN') { // JAPAN
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!JAPANCoursesTaken.includes(coursenum)) {
					JAPANCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!JAPANCoursesTaken.includes(coursenum)) {
						JAPANCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!JAPANCoursesTaken.includes(coursenum)) {
						JAPANCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'JS') { // JS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!JSCoursesTaken.includes(coursenum)) {
					JSCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!JSCoursesTaken.includes(coursenum)) {
						JSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!JSCoursesTaken.includes(coursenum)) {
						JSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'KIN') { // KIN
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!KINCoursesTaken.includes(coursenum)) {
					KINCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!KINCoursesTaken.includes(coursenum)) {
						KINCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!KINCoursesTaken.includes(coursenum)) {
						KINCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'INTEG') { // INTEG
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!INTEGCoursesTaken.includes(coursenum)) {
					INTEGCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!INTEGCoursesTaken.includes(coursenum)) {
						INTEGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!INTEGCoursesTaken.includes(coursenum)) {
						INTEGCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'KOREA') { // KOREA
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!KOREACoursesTaken.includes(coursenum)) {
					KOREACoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!KOREACoursesTaken.includes(coursenum)) {
						KOREACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!KOREACoursesTaken.includes(coursenum)) {
						KOREACoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'LAT') { // LAT
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!LATCoursesTaken.includes(coursenum)) {
					LATCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!LATCoursesTaken.includes(coursenum)) {
						LATCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!LATCoursesTaken.includes(coursenum)) {
						LATCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'LS') { // LS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!LSCoursesTaken.includes(coursenum)) {
					LSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!LSCoursesTaken.includes(coursenum)) {
						LSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!LSCoursesTaken.includes(coursenum)) {
						LSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MSCI') { // MSCI
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MSCICoursesTaken.includes(coursenum)) {
					MSCICoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MSCICoursesTaken.includes(coursenum)) {
						MSCICoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!MSCICoursesTaken.includes(coursenum)) {
						MSCICoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MNS') { // MNS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MNSCoursesTaken.includes(coursenum)) {
					MNSCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MNSCoursesTaken.includes(coursenum)) {
						MNSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!MNSCoursesTaken.includes(coursenum)) {
						MNSCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MATBUS') { // MATBUS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MATBUSCoursesTaken.includes(coursenum)) {
					MATBUSCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MATBUSCoursesTaken.includes(coursenum)) {
						MATBUSCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!MATBUSCoursesTaken.includes(coursenum)) {
						MATBUSCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MATH') { // MATH
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var foundclass = false;
			for (let i = 0;
				((i < MATHCourseNumberReqs1.length) && !foundclass); ++i) {
				if ((MATHCourseNumberReqs1[i] == coursenum) || (MATHCourseNumberReqs2[i] == coursenum) || (MATHCourseNumberReqs3[i] == coursenum)) {
					foundclass = true;
					if (txt.substr(end - 3, 3) === '100') { 
						if (!MATHCoursesTaken.includes(coursenum)) {
							MATHCoursesTaken.push(coursenum);
							MATHCourseNumberReqs1.splice(i, 1);
							MATHCourseNumberReqs2.splice(i, 1);
							MATHCourseNumberReqs3.splice(i, 1);
							MATHUnitReq -= 0.5;
						}
					} else if (isNaN(grade)) {
						if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
							if (!MATHCoursesTaken.includes(coursenum)) {
								MATHCoursesTaken.push(coursenum);
								MATHCourseNumberReqs1.splice(i, 1);
								MATHCourseNumberReqs2.splice(i, 1);
								MATHCourseNumberReqs3.splice(i, 1);
								MATHUnitReq -= 0.5;
							}
						}
					} else {
						if (grade >= 50) {
							if (!MATHCoursesTaken.includes(coursenum)) {
								MATHCoursesTaken.push(coursenum);
								MATHCourseNumberReqs1.splice(i, 1);
								MATHCourseNumberReqs2.splice(i, 1);
								MATHCourseNumberReqs3.splice(i, 1);
								MATHUnitReq -= 0.5;
							}
						}
					}
				}
			}
			if (!foundclass) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!MATHCoursesTaken.includes(coursenum)) {
						MATHCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!MATHCoursesTaken.includes(coursenum)) {
							MATHCoursesTaken.push(coursenum);
							AdditionalUnitReq -= 0.5;
						}
					}
				} else {
					if (grade >= 50) {
						if (!MATHCoursesTaken.includes(coursenum)) {
							MATHCoursesTaken.push(coursenum);
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MTHEL') { // MTHEL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(start + 8, 3) === '300') {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!MTHELCoursesTaken.includes(coursenum)) {
						MTHELCoursesTaken.push(coursenum);
						if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
							TakenCommList2 = true;
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 1;
						} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!MTHELCoursesTaken.includes(coursenum)) {
							MTHELCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!MTHELCoursesTaken.includes(coursenum)) {
							MTHELCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			} else {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!MTHELCoursesTaken.includes(coursenum)) {
						MTHELCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!MTHELCoursesTaken.includes(coursenum)) {
							MTHELCoursesTaken.push(coursenum);
							AdditionalUnitReq -= 0.5;
						}
					}
				} else {
					if (grade >= 50) {
						if (!MTHELCoursesTaken.includes(coursenum)) {
							MTHELCoursesTaken.push(coursenum);
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ME') { // ME
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MECoursesTaken.includes(coursenum)) {
					MECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MECoursesTaken.includes(coursenum)) {
						MECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!MECoursesTaken.includes(coursenum)) {
						MECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MTE') { // MTE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MTECoursesTaken.includes(coursenum)) {
					MTECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MTECoursesTaken.includes(coursenum)) {
						MTECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!MTECoursesTaken.includes(coursenum)) {
						MTECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MEDVL') { // MEDVL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MEDVLCoursesTaken.includes(coursenum)) {
					MEDVLCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MEDVLCoursesTaken.includes(coursenum)) {
						MEDVLCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!MEDVLCoursesTaken.includes(coursenum)) {
						MEDVLCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MOHAWK') { // MOHAWK
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MOHAWKCoursesTaken.includes(coursenum)) {
					MOHAWKCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MOHAWKCoursesTaken.includes(coursenum)) {
						MOHAWKCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!MOHAWKCoursesTaken.includes(coursenum)) {
						MOHAWKCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'MUSIC') { // MUSIC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!MUSICCoursesTaken.includes(coursenum)) {
					MUSICCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!MUSICCoursesTaken.includes(coursenum)) {
						MUSICCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!MUSICCoursesTaken.includes(coursenum)) {
						MUSICCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'NE') { // NE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!NECoursesTaken.includes(coursenum)) {
					NECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!NECoursesTaken.includes(coursenum)) {
						NECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!NECoursesTaken.includes(coursenum)) {
						NECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'OPTOM') { // OPTOM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!OPTOMCoursesTaken.includes(coursenum)) {
					OPTOMCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!OPTOMCoursesTaken.includes(coursenum)) {
						OPTOMCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!OPTOMCoursesTaken.includes(coursenum)) {
						OPTOMCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'NATST') { // NATST
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!NATSTCoursesTaken.includes(coursenum)) {
					NATSTCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!NATSTCoursesTaken.includes(coursenum)) {
						NATSTCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!NATSTCoursesTaken.includes(coursenum)) {
						NATSTCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PACS') { // PACS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PACSCoursesTaken.includes(coursenum)) {
					PACSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PACSCoursesTaken.includes(coursenum)) {
						PACSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PACSCoursesTaken.includes(coursenum)) {
						PACSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PHIL') { // PHIL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PHILCoursesTaken.includes(coursenum)) {
					PHILCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PHILCoursesTaken.includes(coursenum)) {
						PHILCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PHILCoursesTaken.includes(coursenum)) {
						PHILCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'POLSH') { // POLSH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!POLSHCoursesTaken.includes(coursenum)) {
					POLSHCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!POLSHCoursesTaken.includes(coursenum)) {
						POLSHCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!POLSHCoursesTaken.includes(coursenum)) {
						POLSHCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PHYS') { // PHYS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PHYSCoursesTaken.includes(coursenum)) {
					PHYSCoursesTaken.push(coursenum);
					if (PureCourses > 0) {
						PureCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PHYSCoursesTaken.includes(coursenum)) {
						PHYSCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PHYSCoursesTaken.includes(coursenum)) {
						PHYSCoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PLAN') { // PLAN
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PLANCoursesTaken.includes(coursenum)) {
					PLANCoursesTaken.push(coursenum);
					if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PLANCoursesTaken.includes(coursenum)) {
						PLANCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PLANCoursesTaken.includes(coursenum)) {
						PLANCoursesTaken.push(coursenum);
						if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PSCI') { // PSCI
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PSCICoursesTaken.includes(coursenum)) {
					PSCICoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PSCICoursesTaken.includes(coursenum)) {
						PSCICoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PSCICoursesTaken.includes(coursenum)) {
						PSCICoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PORT') { // PORT
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PORTCoursesTaken.includes(coursenum)) {
					PORTCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PORTCoursesTaken.includes(coursenum)) {
						PORTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PORTCoursesTaken.includes(coursenum)) {
						PORTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PD') { // PD
			/// WIP
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 2), 10);
			if (txt.substr(start + 6, 2) === ' 1') {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!TookPD1) {
						TookPD1 = true;
						NumPDCourses -= 1;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!TookPD1) {
							TookPD1 = true;
							NumPDCourses -= 1;
						}
					}
				} else {
					if (grade >= 50) {
						if (!TookPD1) {
							TookPD1 = true;
							NumPDCourses -= 1;
						}
					}
				}
			} else if (txt.substr(start + 6, 2) === '11') {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!TookPD11) {
						TookPD11 = true;
						NumPDCourses -= 1;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!TookPD11) {
							TookPD11 = true;
							NumPDCourses -= 1;
						}
					}
				} else {
					if (grade >= 50) {
						if (!TookPD11) {
							TookPD11 = true;
							NumPDCourses -= 1;
						}
					}
				}
			} else if (txt.substr(start + 6, 2) === '10') {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!TookPD10) {
						TookPD10 = true;
						NumPDCourses -= 1;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!TookPD10) {
							TookPD10 = true;
							NumPDCourses -= 1;
						}
					}
				} else {
					if (grade >= 50) {
						if (!TookPD10) {
							TookPD10 = true;
							NumPDCourses -= 1;
						}
					}
				}
			} else {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!PDCoursesTaken.includes(coursenum)) {
						PDCoursesTaken.push(coursenum);
						NumPDCourses -= 1;
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!PDCoursesTaken.includes(coursenum)) {
							PDCoursesTaken.push(coursenum);
							NumPDCourses -= 1;
						}
					}
				} else {
					if (grade >= 50) {
						if (!PDCoursesTaken.includes(coursenum)) {
							PDCoursesTaken.push(coursenum);
							NumPDCourses -= 1;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PSYCH') { // PSYCH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PSYCHCoursesTaken.includes(coursenum)) {
					PSYCHCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PSYCHCoursesTaken.includes(coursenum)) {
						PSYCHCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!PSYCHCoursesTaken.includes(coursenum)) {
						PSYCHCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'PMATH') { // PMATH
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!PMATHCoursesTaken.includes(coursenum)) {
					PMATHCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!PMATHCoursesTaken.includes(coursenum)) {
						PMATHCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!PMATHCoursesTaken.includes(coursenum)) {
						PMATHCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'REC') { // REC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!RECCoursesTaken.includes(coursenum)) {
					RECCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!RECCoursesTaken.includes(coursenum)) {
						RECCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!RECCoursesTaken.includes(coursenum)) {
						RECCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'RS') { // RS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!RSCoursesTaken.includes(coursenum)) {
					RSCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!RSCoursesTaken.includes(coursenum)) {
						RSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!RSCoursesTaken.includes(coursenum)) {
						RSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'RUSS') { // RUSS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!RUSSCoursesTaken.includes(coursenum)) {
					RUSSCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!RUSSCoursesTaken.includes(coursenum)) {
						RUSSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!RUSSCoursesTaken.includes(coursenum)) {
						RUSSCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'REES') { // REES
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!REESCoursesTaken.includes(coursenum)) {
					REESCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!REESCoursesTaken.includes(coursenum)) {
						REESCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!REESCoursesTaken.includes(coursenum)) {
						REESCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SCI') { // SCI
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SCICoursesTaken.includes(coursenum)) {
					SCICoursesTaken.push(coursenum);
					if (PureCourses > 0) {
						PureCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (AppliedCourses > 0) {
						AppliedCourses -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SCICoursesTaken.includes(coursenum)) {
						SCICoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SCICoursesTaken.includes(coursenum)) {
						SCICoursesTaken.push(coursenum);
						if (PureCourses > 0) {
							PureCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AppliedCourses > 0) {
							AppliedCourses -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SCBUS') { // SCBUS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SCBUSCoursesTaken.includes(coursenum)) {
					SCBUSCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SCBUSCoursesTaken.includes(coursenum)) {
						SCBUSCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!SCBUSCoursesTaken.includes(coursenum)) {
						SCBUSCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SMF') { // SMF
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SMFCoursesTaken.includes(coursenum)) {
					SMFCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SMFCoursesTaken.includes(coursenum)) {
						SMFCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SMFCoursesTaken.includes(coursenum)) {
						SMFCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SDS') { // SDS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SDSCoursesTaken.includes(coursenum)) {
					SDSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SDSCoursesTaken.includes(coursenum)) {
						SDSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SDSCoursesTaken.includes(coursenum)) {
						SDSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SOCWK') { // SOCWK
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SOCWKCoursesTaken.includes(coursenum)) {
					SOCWKCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SOCWKCoursesTaken.includes(coursenum)) {
						SOCWKCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SOCWKCoursesTaken.includes(coursenum)) {
						SOCWKCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SWREN') { // SWREN
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SWRENCoursesTaken.includes(coursenum)) {
					SWRENCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SWRENCoursesTaken.includes(coursenum)) {
						SWRENCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SWRENCoursesTaken.includes(coursenum)) {
						SWRENCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'STV') { // STV
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!STVCoursesTaken.includes(coursenum)) {
					STVCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!STVCoursesTaken.includes(coursenum)) {
						STVCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!STVCoursesTaken.includes(coursenum)) {
						STVCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SOC') { // SOC
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SOCCoursesTaken.includes(coursenum)) {
					SOCCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SOCCoursesTaken.includes(coursenum)) {
						SOCCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SOCCoursesTaken.includes(coursenum)) {
						SOCCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SE') { // SE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SECoursesTaken.includes(coursenum)) {
					SECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SECoursesTaken.includes(coursenum)) {
						SECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!SECoursesTaken.includes(coursenum)) {
						SECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SPAN') { // SPAN
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SPANCoursesTaken.includes(coursenum)) {
					SPANCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SPANCoursesTaken.includes(coursenum)) {
						SPANCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SPANCoursesTaken.includes(coursenum)) {
						SPANCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SPCOM') { // SPCOM
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if ((txt.substr(start + 8, 3) === '100') || (txt.substr(start + 8, 3) === '223')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!SPCOMCoursesTaken.includes(coursenum)) {
						SPCOMCoursesTaken.push(coursenum);
						if (!TakenCommList1) {
							TakenCommList1 = true;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (AdditionalUnitReq > 0) {
							AdditionalUnitReq -= 0.5;
						} else if (!TakenCommList2) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (!TakenCommList1) {
								TakenCommList1 = true;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else if (AdditionalUnitReq > 0) {
								AdditionalUnitReq -= 0.5;
							} else if (!TakenCommList2) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							}
						}
					}
				}
				///
			} else if ((txt.substr(start + 8, 3) === '225') || (txt.substr(start + 8, 3) === '227') || (txt.substr(start + 8, 3) === '228')) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!SPCOMCoursesTaken.includes(coursenum)) {
						SPCOMCoursesTaken.push(coursenum);
						if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
							TakenCommList2 = true;
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 1;
						} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
							TakenCommList2 = true;
							NonMathUnitReq -= 0.5;
						} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (!TakenCommList2 && (HumanityCourseSpecial > 0)) {
								TakenCommList2 = true;
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 1;
							} else if (!TakenCommList2 && (HumanityCourseSpecial == 0)) {
								TakenCommList2 = true;
								NonMathUnitReq -= 0.5;
							} else if (TakenCommList2 && (HumanityCourseSpecial > 0)) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			} else {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!SPCOMCoursesTaken.includes(coursenum)) {
						SPCOMCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourseSpecial > 0) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!SPCOMCoursesTaken.includes(coursenum)) {
							SPCOMCoursesTaken.push(coursenum);
							if (HumanityCourse1 > 0) {
								HumanityCourse1 -= 1;
								NonMathUnitReq -= 0.5;
							} else if (HumanityCourseSpecial > 0) {
								HumanityCourseSpecial -= 1;
								NonMathUnitReq -= 0.5;
							} else if (FillElectives > 0) {
								FillElectives -= 1;
								NonMathUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'STAT') { // STAT (assuming it's a math course)
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var foundclass = false;
			for (let i = 0;
				((i < STATCourseNumberReqs1.length) && !foundclass); ++i) {
				if ((STATCourseNumberReqs1[i] == coursenum) || (STATCourseNumberReqs2[i] == coursenum)) {
					foundclass = true;
					if (txt.substr(end - 3, 3) === '100') { 
						if (!STATCoursesTaken.includes(coursenum)) {
							STATCoursesTaken.push(coursenum);
							STATCourseNumberReqs1.splice(i, 1);
							STATCourseNumberReqs2.splice(i, 1);
							MATHUnitReq -= 0.5;
						}
					} else if (isNaN(grade)) {
						if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
							if (!STATCoursesTaken.includes(coursenum)) {
								STATCoursesTaken.push(coursenum);
								STATCourseNumberReqs1.splice(i, 1);
								STATCourseNumberReqs2.splice(i, 1);
								MATHUnitReq -= 0.5;
							}
						}
					} else {
						if (grade >= 50) {
							if (!STATCoursesTaken.includes(coursenum)) {
								STATCoursesTaken.push(coursenum);
								STATCourseNumberReqs1.splice(i, 1);
								STATCourseNumberReqs2.splice(i, 1);
								MATHUnitReq -= 0.5;
							}
						}
					}
				}
			}
			if (!foundclass) {
				if (txt.substr(end - 3, 3) === '100') { 
					if (!STATCoursesTaken.includes(coursenum)) {
						STATCoursesTaken.push(coursenum);
						if (coursenum == 440) {
							if (CSLastCheckbox > 0) {
								CSLastCheckbox -= 1;
								CSUnitReq -= 0.5;
							} else {
								AdditionalUnitReq -= 0.5;
							}
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				} else if (isNaN(grade)) {
					if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
						if (!STATCoursesTaken.includes(coursenum)) {
							STATCoursesTaken.push(coursenum);
							if (coursenum == 440) {
								if (CSLastCheckbox > 0) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				} else {
					if (grade >= 50) {
						if (!STATCoursesTaken.includes(coursenum)) {
							STATCoursesTaken.push(coursenum);
							if (coursenum == 440) {
								if (CSLastCheckbox > 0) {
									CSLastCheckbox -= 1;
									CSUnitReq -= 0.5;
								} else {
									AdditionalUnitReq -= 0.5;
								}
							} else {
								AdditionalUnitReq -= 0.5;
							}
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SI') { // SI
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SICoursesTaken.includes(coursenum)) {
					SICoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SICoursesTaken.includes(coursenum)) {
						SICoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!SICoursesTaken.includes(coursenum)) {
						SICoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'SYDE') { // SYDE
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!SYDECoursesTaken.includes(coursenum)) {
					SYDECoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!SYDECoursesTaken.includes(coursenum)) {
						SYDECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!SYDECoursesTaken.includes(coursenum)) {
						SYDECoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'UNIV') { // UNIV
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 7, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!UNIVCoursesTaken.includes(coursenum)) {
					UNIVCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!UNIVCoursesTaken.includes(coursenum)) {
						UNIVCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!UNIVCoursesTaken.includes(coursenum)) {
						UNIVCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'VCULT') { // VCULT
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 8, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!VCULTCoursesTaken.includes(coursenum)) {
					VCULTCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!VCULTCoursesTaken.includes(coursenum)) {
						VCULTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!VCULTCoursesTaken.includes(coursenum)) {
						VCULTCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'THPERF') { // THPERF
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 9, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!THPERFCoursesTaken.includes(coursenum)) {
					THPERFCoursesTaken.push(coursenum);
					if (HumanityCourse1 > 0) {
						HumanityCourse1 -= 1;
						NonMathUnitReq -= 0.5;
					} else if (HumanityCourseSpecial > 0) {
						HumanityCourseSpecial -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!THPERFCoursesTaken.includes(coursenum)) {
						THPERFCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!THPERFCoursesTaken.includes(coursenum)) {
						THPERFCoursesTaken.push(coursenum);
						if (HumanityCourse1 > 0) {
							HumanityCourse1 -= 1;
							NonMathUnitReq -= 0.5;
						} else if (HumanityCourseSpecial > 0) {
							HumanityCourseSpecial -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'WS') { // WS
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 5, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!WSCoursesTaken.includes(coursenum)) {
					WSCoursesTaken.push(coursenum);
					if (SocialElectives > 0) {
						SocialElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else if (FillElectives > 0) {
						FillElectives -= 1;
						NonMathUnitReq -= 0.5;
					} else {
						AdditionalUnitReq -= 0.5;
					}
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!WSCoursesTaken.includes(coursenum)) {
						WSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			} else {
				if (grade >= 50) {
					if (!WSCoursesTaken.includes(coursenum)) {
						WSCoursesTaken.push(coursenum);
						if (SocialElectives > 0) {
							SocialElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else if (FillElectives > 0) {
							FillElectives -= 1;
							NonMathUnitReq -= 0.5;
						} else {
							AdditionalUnitReq -= 0.5;
						}
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'ESL') { // ESL
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 6, 3), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!ESLCoursesTaken.includes(coursenum)) {
					ESLCoursesTaken.push(coursenum);
					AdditionalUnitReq -= 0.5;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!ESLCoursesTaken.includes(coursenum)) {
						ESLCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			} else {
				if (grade >= 50) {
					if (!ESLCoursesTaken.includes(coursenum)) {
						ESLCoursesTaken.push(coursenum);
						AdditionalUnitReq -= 0.5;
					}
				}
			}
		}
		if (txt.substr(start + 1, 6).split(" ")[0] == 'WKRPT') { // WKRPT
			const end = txt.indexOf('\n', start + 1); 
			var grade = parseInt(txt.substr(end - 2, 2), 10);
			var coursenum = parseInt(txt.substr(start + 10, 1), 10);
			if (txt.substr(end - 3, 3) === '100') { 
				if (!WKRPTCoursesTaken.includes(coursenum)) {
					WKRPTCoursesTaken.push(coursenum);
					WKRPTsLeft -= 1;
				}
			} else if (isNaN(grade)) {
				if ((txt.substr(end - 3, 3) === 'AEG') || ((txt.substr(end - 2, 2) === 'CR') && (txt.substr(end - 3, 3) != 'NCR'))) {
					if (!WKRPTCoursesTaken.includes(coursenum)) {
						WKRPTCoursesTaken.push(coursenum);
						WKRPTsLeft -= 1;
					}
				}
			} else {
				if (grade >= 50) {
					if (!WKRPTCoursesTaken.includes(coursenum)) {
						WKRPTCoursesTaken.push(coursenum);
						WKRPTsLeft -= 1;
					}
				}
			}
		}
		start = txt.indexOf('\n', start + 1); 
	}
}
const app = express();
app.use("/", express.static("public"));
app.use(fileUpload());
app.post("/extract-text", (req, res) => {
	if (!req.files && !req.files.pdfFile) {
		res.status(400);
		res.end();
	}
	pdfParse(req.files.pdfFile).then(result => {
		extractTakenCourses(result.text); // modifies output
		if (CSCourseNumberReqs1.length == 0) {
			output = output.concat("You passed all the specific required CS courses!\n");
		} else {
			output = output.concat("The CS courses that you still need to pass are:\n");
			for (let i = 0; i < CSCourseNumberReqs1.length; ++i) {
				output = output.concat("- " + CSCourseNumberReqs2[i]);
				if (CSCourseNumberReqs1[i] != -1) {
					output = output.concat(" or " + CSCourseNumberReqs1[i]);
				}
				if (CSCourseNumberReqs3[i] != -1) {
					output = output.concat(" or " + CSCourseNumberReqs3[i]);
				}
				output = output.concat("\n");

			}
		}
		if ((CSUnitReq - (CSCourseNumberReqs1.length * 0.5)) == 0) {
			output = output.concat("You passed all the other required CS courses!\n");
		} else {
			output = output.concat("You also need to pass an additional ");
			output = output.concat((CSUnitReq - (CSCourseNumberReqs1.length * 0.5)) + " CS units (that's " + (CSUnitReq - (CSCourseNumberReqs1.length * 0.5)) * 2 + " CS courses).\n");
			output = output.concat("Those CS courses need to be: ");
			output = output.concat(CS340to398 + " 340-398s, " + CS440to489 + " 440-489s, and " + CSLastCheckbox + " of 440-498 or 499T or 6XX or 7XX or CO 487 or STAT 440.\n");
		}
		if (MATHCourseNumberReqs1.length == 0) {
			output = output.concat("You passed all the required MATH courses!\n");
		} else {
			output = output.concat("The MATH courses that you still need to pass are:\n");
			for (let i = 0; i < MATHCourseNumberReqs1.length; ++i) {
				output = output.concat("- " + MATHCourseNumberReqs2[i]);
				if (MATHCourseNumberReqs1[i] != -1) {
					output = output.concat(" or " + MATHCourseNumberReqs1[i]);
				}
				if (MATHCourseNumberReqs3[i] != -1) {
					output = output.concat(" or " + MATHCourseNumberReqs3[i]);
				}
				output = output.concat("\n");

			}
		}
		if (STATCourseNumberReqs1.length == 0) {
			output = output.concat("You passed all the required STAT courses!\n");
		} else {
			output = output.concat("The STAT courses that you still need to pass are:\n");
			for (let i = 0; i < STATCourseNumberReqs1.length; ++i) {
				output = output.concat("- " + STATCourseNumberReqs1[i]);
				if (STATCourseNumberReqs2[i] != -1) {
					output = output.concat(" or " + STATCourseNumberReqs2[i]);
				}
				output = output.concat("\n");

			}
		}
		if (NonMathUnitReq <= 0) {
			output = output.concat("You passed all the non-MATH elective unit requirements!\n");
		} else {
			output = output.concat("Additionally, you need to pass ");
			output = output.concat(NonMathUnitReq + " non-MATH elective units (that's " + (NonMathUnitReq * 2) + " non-MATH elective courses). In particular, you need:" + "\n");
			if (!TakenCommList1) {
				output = output.concat("- one course that satisfies the Communication List I requirement\n");
			}
			if (!TakenCommList2) {
				output = output.concat("- one course that satisfies the Communication List II requirement\n");
			}
			if ((HumanityCourse1 + HumanityCourseSpecial) != 0) {
				output = output.concat("- " + (HumanityCourse1 + HumanityCourseSpecial) + " Humanity courses" + "\n");
			}
			if (SocialElectives != 0) {
				output = output.concat("- " + SocialElectives + " Social Science courses" + "\n");
			}
			if (PureCourses != 0) {
				output = output.concat("- " + PureCourses + " Pure Science courses" + "\n");
			}
			if (AppliedCourses != 0) {
				output = output.concat("- " + AppliedCourses + " Pure or Applied Science courses" + "\n");
			}
			if (FillElectives != 0) {
				output = output.concat("- " + FillElectives + " other non-MATH elective courses" + "\n");
			}
		}
		DepthCheck(AFMCoursesTaken);
		DepthCheck(AHSCoursesTaken);
		DepthCheck(ANTHCoursesTaken);
		DepthCheck(APPLSCoursesTaken);
		DepthCheck(ARABICCoursesTaken);
		DepthCheck(ARBUSCoursesTaken);
		DepthCheck(ARCHCoursesTaken);
		DepthCheck(ARTSCoursesTaken);
		DepthCheck(AVIACoursesTaken);
		DepthCheck(BETCoursesTaken);
		DepthCheck(CDNSTCoursesTaken);
		DepthCheck(BIOLCoursesTaken);
		DepthCheck(BUSCoursesTaken);
		DepthCheck(CHEMCoursesTaken);
		DepthCheck(CHINACoursesTaken);
		DepthCheck(CLASCoursesTaken);
		DepthCheck(CMWCoursesTaken);
		DepthCheck(COMMCoursesTaken);
		DepthCheck(CROATCoursesTaken);
		DepthCheck(DACCoursesTaken);
		DepthCheck(DRAMACoursesTaken);
		DepthCheck(DUTCHCoursesTaken);
		DepthCheck(EARTHCoursesTaken);
		DepthCheck(EASIACoursesTaken);
		DepthCheck(ECONCoursesTaken);
		DepthCheck(ENBUSCoursesTaken);
		DepthCheck(ENGLCoursesTaken);
		DepthCheck(GSJCoursesTaken);
		DepthCheck(ENVSCoursesTaken);
		DepthCheck(ERSCoursesTaken);
		DepthCheck(FINECoursesTaken);
		DepthCheck(FRCoursesTaken);
		DepthCheck(GBDACoursesTaken);
		DepthCheck(GEOGCoursesTaken);
		DepthCheck(GERCoursesTaken);
		DepthCheck(GERONCoursesTaken);
		DepthCheck(GRKCoursesTaken);
		DepthCheck(HISTCoursesTaken);
		DepthCheck(HLTHCoursesTaken);
		DepthCheck(HRMCoursesTaken);
		DepthCheck(HUMSCCoursesTaken);
		DepthCheck(INDEVCoursesTaken);
		DepthCheck(INTEGCoursesTaken);
		DepthCheck(INTSTCoursesTaken);
		DepthCheck(ISCoursesTaken);
		DepthCheck(ISSCoursesTaken);
		DepthCheck(ITALCoursesTaken);
		DepthCheck(ITALSTCoursesTaken);
		DepthCheck(JAPANCoursesTaken);
		DepthCheck(JSCoursesTaken);
		DepthCheck(KINCoursesTaken);
		DepthCheck(KOREACoursesTaken);
		DepthCheck(LATCoursesTaken);
		DepthCheck(LSCoursesTaken);
		DepthCheck(MEDVLCoursesTaken);
		DepthCheck(MNSCoursesTaken);
		DepthCheck(MUSICCoursesTaken);
		DepthCheck(NATSTCoursesTaken);
		DepthCheck(OPTOMCoursesTaken);
		DepthCheck(PACSCoursesTaken);
		DepthCheck(PHILCoursesTaken);
		DepthCheck(PHYSCoursesTaken);
		DepthCheck(PLANCoursesTaken);
		DepthCheck(POLSHCoursesTaken);
		DepthCheck(PORTCoursesTaken);
		DepthCheck(ASLCoursesTaken);
		DepthCheck(PSCICoursesTaken);
		DepthCheck(PSYCHCoursesTaken);
		DepthCheck(RECCoursesTaken);
		DepthCheck(REESCoursesTaken);
		DepthCheck(RSCoursesTaken);
		DepthCheck(RUSSCoursesTaken);
		DepthCheck(MSCICoursesTaken);
		DepthCheck(SCICoursesTaken);
		DepthCheck(SDSCoursesTaken);
		DepthCheck(SICoursesTaken);
		DepthCheck(SMFCoursesTaken);
		DepthCheck(SOCCoursesTaken);
		DepthCheck(SOCWKCoursesTaken);
		DepthCheck(SPANCoursesTaken);
		DepthCheck(SPCOMCoursesTaken);
		DepthCheck(STVCoursesTaken);
		DepthCheck(SWRENCoursesTaken);
		DepthCheck(VCULTCoursesTaken);
		DepthCheck(WSCoursesTaken);

		DepthCheck(BMECoursesTaken);
		DepthCheck(BASECoursesTaken);
		DepthCheck(EFACoursesTaken);
		DepthCheck(THPERFCoursesTaken);
		DepthCheck(INDGCoursesTaken);
		DepthCheck(INTTSCoursesTaken);
		DepthCheck(MOHAWKCoursesTaken);
		if (DepthSatisfied) {
			output = output.concat("Your Depth requirement is satisfied!\n");
		} else {
			output = output.concat("Your Depth requirement is not satisfied!\n");
		}
		output = output.concat("Now relating to your Co-op, you need to pass ");
		output = output.concat(WKRPTsLeft + " work reports" + ", and ");
		output = output.concat(NumPDCourses + " PD courses." + " When it comes to the required PD courses for BCS, you:\n");
		if (TookPD1) {
			output = output.concat("- passed PD1\n");
		} else {
			output = output.concat("- did not pass PD1\n");
		}
		if (TookPD11) {
			output = output.concat("- passed PD11\n");
		} else {
			output = output.concat("- did not pass PD11\n");
		}
		if (TookPD10) {
			output = output.concat("- passed PD10\n");
		} else {
			output = output.concat("- did not pass PD10\n");
		}

		output = output.concat("Finally, you ");
		if (AdditionalUnitReq > 0) {
			output = output.concat("still need to pass " + AdditionalUnitReq + " additional MATH or non-MATH units (that's " + (AdditionalUnitReq * 2) + " MATH or non-MATH courses).\n");
		} else {
			output = output.concat("passed all the required additional MATH or non-MATH courses!\n");
		}

		res.send(output); // outputs the text onto the webpage
		// reset all global variables
		output = "";
		start = 0;
		CS340to398 = 3;
		CS440to489 = 2;
		CSLastCheckbox = 1;
		CSCourseNumberReqs1 = [115, -1, -1, -1, -1, -1, -1, -1, -1];
		CSCourseNumberReqs2 = [135, 136, 240, 241, 245, 246, 251, 341, 350];
		CSCourseNumberReqs3 = [145, 146, -1, -1, -1, -1, -1, -1, -1];
		CSUnitReq = 7.5;
		CSCoursesTaken = [];
		MATHCourseNumberReqs1 = [-1, -1, 127, 128, -1];
		MATHCourseNumberReqs2 = [135, 136, 137, 138, 239];
		MATHCourseNumberReqs3 = [145, 146, 147, 148, 249];
		MATHCoursesTaken = [];
		STATCourseNumberReqs1 = [230, 231];
		STATCourseNumberReqs2 = [240, 241];
		STATCoursesTaken = [];
		COCoursesTaken = [];
		MATHUnitReq = 3.5;
		TakenCommList1 = false;
		TakenCommList2 = false;
		NonMathUnitReq = 5.0;
		AdditionalUnitReq = 4.0;
		FillElectives = 2;
		EMLSCoursesTaken = [];
		SocialElectives = 2;
		ENGLCoursesTaken = [];
		SPCOMCoursesTaken = [];
		MTHELCoursesTaken = [];
		AFMCoursesTaken = [];
		ANTHCoursesTaken = [];
		APPLSCoursesTaken = [];
		ARBUSCoursesTaken = [];
		BETCoursesTaken = [];
		BUSCoursesTaken = [];
		COMMCoursesTaken = [];
		ECONCoursesTaken = [];
		ENBUSCoursesTaken = [];
		GBDACoursesTaken = [];
		GEOGCoursesTaken = [];
		GERONCoursesTaken = [];
		HRMCoursesTaken = [];
		INDEVCoursesTaken = [];
		INTEGCoursesTaken = [];
		INTSTCoursesTaken = [];
		ISSCoursesTaken = [];
		LSCoursesTaken = [];
		NATSTCoursesTaken = [];
		PACSCoursesTaken = [];
		PSCICoursesTaken = [];
		PSYCHCoursesTaken = [];
		RECCoursesTaken = [];
		SDSCoursesTaken = [];
		SMFCoursesTaken = [];
		SOCCoursesTaken = [];
		SOCWKCoursesTaken = [];
		STVCoursesTaken = [];
		SWRENCoursesTaken = [];
		WSCoursesTaken = [];
		GSJCoursesTaken = [];
		PureCourses = 1;
		BIOLCoursesTaken = [];
		CHEMCoursesTaken = [];
		EARTHCoursesTaken = [];
		PHYSCoursesTaken = [];
		SCICoursesTaken = [];
		AppliedCourses = 1;
		AHSCoursesTaken = [];
		ARCHCoursesTaken = [];
		AVIACoursesTaken = [];
		ENVSCoursesTaken = [];
		ERSCoursesTaken = [];
		HLTHCoursesTaken = [];
		KINCoursesTaken = [];
		MNSCoursesTaken = [];
		OPTOMCoursesTaken = [];
		PLANCoursesTaken = [];
		ARABICCoursesTaken = [];
		ASLCoursesTaken = [];
		HumanityCourse1 = 1;
		HumanityCourseSpecial = 1;
		ARTSCoursesTaken = [];
		CHINACoursesTaken = [];
		CLASCoursesTaken = [];
		CMWCoursesTaken = [];
		CROATCoursesTaken = [];
		DACCoursesTaken = [];
		DRAMACoursesTaken = [];
		DUTCHCoursesTaken = [];
		EASIACoursesTaken = [];
		// ENGL
		FINECoursesTaken = [];
		FRCoursesTaken = [];
		GERCoursesTaken = [];
		GRKCoursesTaken = [];
		HISTCoursesTaken = [];
		HUMSCCoursesTaken = [];
		ITALCoursesTaken = [];
		ITALSTCoursesTaken = [];
		JAPANCoursesTaken = [];
		JSCoursesTaken = [];
		KOREACoursesTaken = [];
		LATCoursesTaken = [];
		MEDVLCoursesTaken = [];
		MUSICCoursesTaken = [];
		PHILCoursesTaken = [];
		POLSHCoursesTaken = [];
		PORTCoursesTaken = [];
		REESCoursesTaken = [];
		RSCoursesTaken = [];
		RUSSCoursesTaken = [];
		SICoursesTaken = [];
		SPANCoursesTaken = [];
		VCULTCoursesTaken = [];
		ACTSCCoursesTaken = [];
		AMATHCoursesTaken = [];
		CHECoursesTaken = [];
		CIVECoursesTaken = [];
		CMCoursesTaken = [];
		COOPCoursesTaken = [];
		ECECoursesTaken = [];
		ENVECoursesTaken = [];
		ESLCoursesTaken = [];
		GENECoursesTaken = [];
		GEOECoursesTaken = [];
		ISCoursesTaken = [];
		MATBUSCoursesTaken = [];
		MOHAWKCoursesTaken = [];
		MECoursesTaken = [];
		MSCICoursesTaken = [];
		MTECoursesTaken = [];
		NECoursesTaken = [];
		PDCoursesTaken = [];
		PMATHCoursesTaken = [];
		SCBUSCoursesTaken = [];
		SECoursesTaken = [];
		SYDECoursesTaken = [];
		UNIVCoursesTaken = [];
		WKRPTCoursesTaken = [];
		BMECoursesTaken = [];
		BASECoursesTaken = [];
		EFACoursesTaken = [];
		THPERFCoursesTaken = [];
		CDNSTCoursesTaken = [];
		INDGCoursesTaken = [];
		INTTSCoursesTaken = [];
		COOPReqs = 6;
		WKRPTsLeft = 4;
		TookPD1 = false;
		TookPD11 = false;
		TookPD10 = false;
		NumPDCourses = 5;
		DepthSatisfied = false;
	});
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening at http://localhost:' + port)
});