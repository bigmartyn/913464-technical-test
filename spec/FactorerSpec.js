describe("Factorer", function() {
    var factorer;

    beforeEach(function () {
        factorer = new CurrencyFactorer();
    });

    it("should return nothing for zero or negative numbers", function() {
        expect(factorer.factor(0)).toEqual([]);
        expect(factorer.factor(-1)).toEqual([]);
    });

    it("should return exactly one of each of the denominations given that exact amount", function() {
        expect(factorer.factor(1)).toEqual([[1, '1p']]);
        expect(factorer.factor(2)).toEqual([[1, '2p']]);
//        expect(factorer.factor(5)).toEqual([[1, '5p']]);
//        expect(factorer.factor(10)).toEqual([[1, '10p']]);
        expect(factorer.factor(20)).toEqual([[1, '20p']]);
        expect(factorer.factor(50)).toEqual([[1, '50p']]);
        expect(factorer.factor(100)).toEqual([[1, '&pound;1']]);
        expect(factorer.factor(200)).toEqual([[1, '&pound;2']]);
    });

    it("should return 1x one pound, 1 x 20p, 1 x 2p and 1 x 1p for 123 pence", function() {
        expect(factorer.factor(123)).toEqual([[1, '&pound;1'], [1, '20p'], [1, '2p'], [1, '1p']]);
    });

    it("should return 2 x two pound and 1 x one pound for five pounds", function() {
        expect(factorer.factor(500)).toEqual([[2, '&pound;2'], [1, '&pound;1']]);
    });
    
    it("should return 1 x 50p and 2 x 20p and 4 x 2p and 1 x 1p for 99 pence", function() {
        expect(factorer.factor(99)).toEqual([[1, '50p'], [2, '20p'], [4, '2p'], [1, '1p']]);
    });
    
    it("should be possible to set USD as the currency format and factor dollars", function() {
        expect(factorer.setCurrency('USD')).toEqual(true);
        expect(factorer.factor(1)).toEqual([[1, '1&cent;']]);
        expect(factorer.factor(5)).toEqual([[1, '5&cent;']]);
        expect(factorer.factor(10)).toEqual([[1, '10&cent;']]);
        expect(factorer.factor(25)).toEqual([[1, '25&cent;']]);
        expect(factorer.factor(50)).toEqual([[1, '50&cent;']]);
        expect(factorer.factor(100)).toEqual([[1, '$1']]);
        expect(factorer.factor(200)).toEqual([[1, '$2']]);
        expect(factorer.factor(500)).toEqual([[1, '$5']]);
        expect(factorer.factor(1000)).toEqual([[1, '$10']]);
        expect(factorer.factor(2000)).toEqual([[1, '$20']]);
        expect(factorer.factor(5000)).toEqual([[1, '$50']]);
        expect(factorer.factor(10000)).toEqual([[1, '$100']]);
        expect(factorer.factor(39999)).toEqual([[3, '$100'],[1, '$50'],[2, '$20'],[1, '$5'],[2, '$2'],[1, '50&cent;'],[1, '25&cent;'],[2, '10&cent;'],[4, '1&cent;']]);
    });

    it("should reject an attempt to set an unknown currency", function() {
        expect(factorer.setCurrency("EUR")).toEqual(false);
    });
    
});
