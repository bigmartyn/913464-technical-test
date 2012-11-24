describe("Parser", function() {
    var parser;

    beforeEach(function () {
        parser = new CurrencyParser();
    });

    it("should reject an empty string", function() {
        expect(function() { parser.parse("");          }).toThrow(new Error("empty string"));
        expect(function() { parser.parse("         "); }).toThrow(new Error("empty string"));
    });

    it("should reject a non-numeric character", function() {
        expect(function() { parser.parse("1x"); }).toThrow(new Error("non-numeric character"));
        expect(function() { parser.parse("£1x.0p"); }).toThrow(new Error("non-numeric character"));
    });

    it("should accept a single-digit string", function() {
        expect(parser.parse("4")).toEqual(4);
    });

    it("should accept an double-digit string", function() {
        expect(parser.parse("85")).toEqual(85);
    });

    it("should accept one or more digits and a trailing pence symbol", function() {
        expect(parser.parse("197p")).toEqual(197);
        expect(parser.parse("2p")).toEqual(2);      
    });

    it("should accept a bare number with hundreds and units", function() {
        expect(parser.parse("1.87")).toEqual(187);
    });

    it("should accept a number with a leading currency symbol", function() {
        expect(parser.parse("£1.23")).toEqual(123);
        expect(parser.parse("£2")).toEqual(200);
        expect(parser.parse("£10")).toEqual(1000);
    });

    it("should accept a number with leading and trailing symbols", function() {
        expect(parser.parse("£1.87p")).toEqual(187);
        expect(parser.parse("£1p")).toEqual(100);
        expect(parser.parse("£1.p")).toEqual(100);
    });

    it("should round multiple decimal places to two", function() {
        expect(parser.parse("4.235p")).toEqual(424);
        expect(parser.parse("4.234p")).toEqual(423);
        expect(parser.parse("£1.257422457p")).toEqual(126);
    });

    it("should reject numbers with no digits", function() {
        expect(function() { parser.parse("p"); }).toThrow(new Error("missing digits"));      
        expect(function() { parser.parse(".p"); }).toThrow(new Error("missing digits"));      
        expect(function() { parser.parse("£p"); }).toThrow(new Error("missing digits"));      
        expect(function() { parser.parse("£.p"); }).toThrow(new Error("missing digits"));      
    });

    it("should reject numbers with too many unit separators", function() {
        expect(function() { parser.parse("1.8.7"); }).toThrow(new Error("non-numeric character"));      
    });

    it("should ignore leading zeros", function() {
        expect(parser.parse("000013")).toEqual(13);
        expect(parser.parse("000013p")).toEqual(13);
        expect(parser.parse("001.41p")).toEqual(141);
        expect(parser.parse("£001.41")).toEqual(141);
        expect(parser.parse("£001.41p")).toEqual(141);
    });

    it("should be possible to set USD as the currency format and parse dollars", function() {
        expect(parser.setCurrency("USD")).toEqual(true);
        expect(parser.parse("$12.34")).toEqual(1234);
        expect(parser.parse("34¢")).toEqual(34);
        expect(parser.parse("$34")).toEqual(3400);
    });

    it("should reject an attempt to set an unknown currency", function() {
        expect(parser.setCurrency("EUR")).toEqual(false);
    });


});
