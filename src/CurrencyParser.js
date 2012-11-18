/*	PARSE DECIMAL CURRENCY STRINGS AND RETURN VALUE AS INTEGER NUMBER OF UNITS
 */

function CurrencyParser() {
	var unitSeparator = '.',
		unitsSuffix = 'p';

	this.parse = function(currencyString) {
		var hundreds, i, parsed, result, units;

		function isDigit(c) {
			return ('0' <= c && c <= '9');
		}

		currencyString = currencyString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if (currencyString == "") {
			throw new Error("empty string");
		}

		hundreds = null;
		units = 0;
		for (i = 0, parsed = false; !parsed && i < currencyString.length; ++i) {
			if (isDigit(currencyString.charAt(i))) {
				units = (units * 10) + parseInt(currencyString.charAt(i), 10);
			} else if (currencyString.indexOf(unitsSuffix, i) == i) {
				parsed = true;
			} else if (currencyString.indexOf(unitSeparator, i) == i) {
				if (hundreds != null) {
					throw new Error("non-numeric character");
				}
				hundreds = units;
				units = 0;
			} else {
				throw new Error("non-numeric character");
			}
		}
		if (hundreds === null) {
			result = units;
		} else {
			result = (hundreds * 100) + units;
		}
		return result;
	} 
}
