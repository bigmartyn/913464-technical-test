/*	PARSE DECIMAL CURRENCY STRINGS AND RETURN VALUE AS INTEGER NUMBER OF UNITS
 */

function CurrencyParser() {
	var unitsSuffix = 'p';

	this.parse = function(currencyString) {
		var i, parsed, units;
		
		function isDigit(c) {
			return ('0' <= c && c <= '9');
		}

		currencyString = currencyString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if (currencyString == "") {
			throw new Error("empty string");
		}

		units = 0;
		for (i = 0, parsed = false; !parsed && i < currencyString.length; ++i) {
			if (isDigit(currencyString.charAt(i))) {
				units = (units * 10) + parseInt(currencyString.charAt(i), 10);
			} else if (currencyString.indexOf(unitsSuffix, i) == i) {
				parsed = true;
			} else {
				throw new Error("non-numeric character");
			}
		}
		return units;
	} 
}
