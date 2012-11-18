/*	PARSE DECIMAL MONEY STRINGS AND RETURN VALUE AS INTEGER NUMBER OF UNITS
 */

function CurrencyParser() {
    var currentFormat = 'GBP';
    var formats = {
        'GBP': '([£]*)([^\\.p]*)(\\.*)([^p]*)([p]*)',
        'USD': '([$]*)([^\\.¢]*)(\\.*)([^¢]*)([¢]*)'
    };

    /*  set currency code for parser
     */
    this.setCurrency = function(currency) {
        var result = false;

        if (formats.hasOwnProperty(currency)) {
            currentFormat = currency;
            result = true;
        }
        return result;
    }

    /*  parse money strings using a regexp
     */
    this.parse = function(moneyString) {
        var hundreds, matcher, parts, units;

		moneyString = moneyString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if (moneyString == "") {
			throw new Error("empty string");
        }

        matcher = new RegExp(formats[currentFormat]);
        parts = moneyString.match(matcher);
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
