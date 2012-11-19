/*	GIVEN A MONETARY AMOUNT, RETURN THE MINIMUM DENOMINATIONS NEEDED FOR IT
 */

function CurrencyFactorer() {
    var currentFormat = 'GBP';
    var denominations = {
        'GBP': {"£2": 200, "£1": 100, "50p": 50, "20p": 20, "2p": 2, "1p": 1}
    };

    /*  set currency code for factorer
     */
    this.setCurrency = function(currency) {
        var result = false;

        if (formats.hasOwnProperty(currency)) {
            currentFormat = currency;
            result = true;
        }
        return result;
    }

    /*  return monetary denominations needed to make up amount
     */
    this.factor = function(amount) {
        var result;

        result = [];
        return result;
        }

}
