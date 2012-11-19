/*	GIVEN A MONETARY AMOUNT, RETURN THE MINIMUM DENOMINATIONS NEEDED FOR IT
 */

function CurrencyFactorer() {
    var currentFormat = 'GBP';
    var denominations = {
        'GBP': {
            // TODO: find out why 5p and 10p have been omitted
            names:  ["&pound;2", "&pound;1", "50p", "20p", "2p", "1p"],
            values: [      200,        100,    50,    20,    2,    1]},
        'USD': {
            names:  ["$100", "$50", "$20", "$10", "$5", "$2", "$1", "50&cent;", "25&cent;", "10&cent;", "5&cent;", "1&cent;"],
            values: [10000,  5000,  2000,  1000,  500,  200,  100,   50,         25,         10,         5,         1]}
        };

    /*  set currency code for factorer
     */
    this.setCurrency = function(currency) {
        var result = false;

        if (denominations.hasOwnProperty(currency)) {
            currentFormat = currency;
            result = true;
        }
        return result;
    }

    /*  return monetary denominations needed to make up amount
     */
    this.factor = function(amount) {
        var coinage, i, nmrCoins, result, values;

        result = [];
        if (amount > 0) {
            coinage = denominations[currentFormat].names;
            values = denominations[currentFormat].values;
            for (i = 0; i < coinage.length; ++i) {
                if (amount >= values[i]) {
                    nmrCoins = Math.floor(amount / values[i]);
                    amount -= nmrCoins * values[i];
                    result.push([nmrCoins, coinage[i]]);
                }
            }
        }
        return result;
        }

}
