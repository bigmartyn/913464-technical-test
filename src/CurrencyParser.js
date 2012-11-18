/*	PARSE DECIMAL CURRENCY STRINGS AND RETURN VALUE AS INTEGER NUMBER OF UNITS
 */

function CurrencyParser() {
    this.parse = function(currencyString) {
        var hundreds, parts, units;

		currencyString = currencyString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if (currencyString == "") {
			throw new Error("empty string");
        }

        parts = currencyString.match(/([£]*)([^\.p]*)(\.*)([^p]*)([p]*)/);
        hundreds = parts[2];
        units = parts[4];

        if (hundreds == "" && units == "") {
			throw new Error("missing digits");
        }
        // TODO: strip group separators (e.g. ',') from strings before checking for non-numerics
        if ((hundreds != "" && !/^\d+$/.test(hundreds)) || (units != "" && !/^\d+$/.test(units))) {
			throw new Error("non-numeric character");
        }

        if (hundreds != "" && units == "" && parts[1] == "") {
            units = hundreds;
            hundreds = "";
        }

        units = (units == "") ? 0 : parseInt(units, 10);   
        if (hundreds != "" && units > 99) {     // round units to 2 decimals
            units = units.toString();
            units = Math.round(units.substr(0, 2) + "." + units.substr(2, 1));
        }
        hundreds = (hundreds == "") ? 0 : parseInt(hundreds, 10);
        return (hundreds * 100) + units;
        }

}
