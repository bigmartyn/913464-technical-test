/*	PARSE DECIMAL CURRENCY STRINGS AND RETURN VALUE AS INTEGER NUMBER OF UNITS
 */

function CurrencyParser() {
	var currencySymbol = '£',
		unitsSeparator = '.',
		currencySuffix = 'p';

	this.parse = function(currencyString) {
		var hundreds, i, nextState, result, state, units;

		function isDigit(c) {
			return ('0' <= c && c <= '9');
		}

		currencyString = currencyString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

		hundreds = null;
		units = null;

		for (state = "checkForEmptyString"; state != "done"; state = nextState) {
			switch (state) {
			case 'checkForEmptyString':
				if (0 == currencyString.length) {
					nextState = "errorEmptyString";
				} else {
					i = 0;
					nextState = "lookingForCurrencyPrefix";
				}
				break;
			case "lookingForCurrencyPrefix":
				if (currencyString.indexOf(currencySymbol, i) !== i) {
					nextState = "parsePotentialUnits";
				} else {
					i += currencySymbol.length;
					nextState = "parsingHundredsDigits";
				}
				break;
			case "parsingHundredsDigits":
				if (i == currencyString.length) {
					nextState = 'checkDigitsPresent';
				} else if (!isDigit(currencyString.charAt(i))) {
					nextState = "lookingForUnitsSeparator";
				} else {
					hundreds = (null === hundreds) ? 0 : (hundreds * 10);
					hundreds += parseInt(currencyString.charAt(i), 10);
					++i;
					nextState = "parsingHundredsDigits";
				}
				break;
			case "lookingForUnitsSeparator":
				if (currencyString.indexOf(unitsSeparator, i) != i) {
					 nextState = "lookingForcurrencySuffix";
				} else {
					i += unitsSeparator.length;
					nextState = "parseUnitsDigits";
				}
				break;
			case "parsePotentialUnits":
				if (i == currencyString.length) {
					nextState = 'checkDigitsPresent';
				} else if (currencyString.indexOf(unitsSeparator, i) == i) {
					nextState = "bumpUnitsToHundreds";
				} else if (!isDigit(currencyString.charAt(i))) {
					nextState = "lookingForcurrencySuffix";
				} else {
					units = (null === units) ? 0 : (units * 10);
					units += parseInt(currencyString.charAt(i), 10);
					++i;
					nextState = "parsePotentialUnits";
				}
				break;
			case 'bumpUnitsToHundreds':
				if (null !== hundreds) {
					nextState = "errorNonNumericCharacter";
				} else {
					hundreds = units;
					units = null;
					++i;
					nextState = "parseUnitsDigits"
				}
				break;
			case "parseUnitsDigits":
				if (i == currencyString.length) {
					nextState = 'checkDigitsPresent';
				} else if (!isDigit(currencyString.charAt(i))) {
					nextState = "lookingForcurrencySuffix";
				} else {
					units = (null === units) ? 0 : (units * 10);
					units += parseInt(currencyString.charAt(i), 10);
					++i;
					nextState = "parseUnitsDigits";
				}
				break;
			case "lookingForcurrencySuffix":
				if (currencyString.indexOf(currencySuffix, i) != i) {
					 nextState = "errorNonNumericCharacter";
				 } else {
					 nextState = "checkDigitsPresent";
				 }
				break;
			case "checkDigitsPresent":
				if (null === hundreds && null === units) {
					nextState = "errorMissingDigits";
				} else {
					nextState = "calculateResult";
				}
				break;
			case "calculateResult":
				hundreds = (null === hundreds) ? 0 : hundreds;
				units = (null === units) ? 0 : units;
				result = (hundreds * 100) + units;
				nextState = "done";
				break;
			case "errorEmptyString":
				throw new Error("empty string");
				break;
			case "errorNonNumericCharacter":
				throw new Error("non-numeric character");
				break;
			case "errorMissingDigits":
				throw new Error("missing digits");
				break;
			default:
				throw new Error("internal error - unknown state: " + state);
				break;
			}
		}
		return result;
    } 
}
