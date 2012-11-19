describe("Factorer", function() {
    var factorer;

    beforeEach(function () {
        factorer = new CurrencyFactorer();
    });

    it("should return nothing for zero or negative numbers", function() {
        expect(factorer.factor(0)).toEqual([]);
        expect(factorer.factor(-1)).toEqual([]);
    });

});
