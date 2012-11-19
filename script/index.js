// TODO: make event attachment work in more than just Chrome
window.addEventListener('load', function() {
    var amountBox = document.getElementById('amount');
    var factorButton = document.getElementById('factor');
    var factorForm = document.getElementById('factorForm');
    var resultBox = document.getElementById('result');
        
    var parser = new CurrencyParser();
    var factorer = new CurrencyFactorer();
        
    function handleClick(e) {
        var breakdown, comma, e, message;
        try {
            breakdown = factorer.factor(parser.parse(amountBox.value));
            message = amountBox.value + " = ";
            comma = "";
            for (i = 0; i < breakdown.length; ++i) {
                message += comma + breakdown[i][0] + " x " + breakdown[i][1];
                comma = ", ";
            }
        } catch (e) {
            message = "Sorry, couldn't process " + amountBox.value + ": " + e.message;
        }
        resultBox.innerHTML = message;
        e.preventDefault();
        return false;
    }

    factorButton.addEventListener('click', handleClick, false);
    factorForm.addEventListener('submit', handleClick, false);

    document.getElementById("main").style.display='block';
}, false);
