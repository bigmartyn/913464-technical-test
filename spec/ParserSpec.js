describe("Parser", function() {
  var parser;

  beforeEach(function() {
    parser = new CurrencyParser();
  });

  it("should reject an empty string", function() {
	  expect(function() { parser.parse("");          }).toThrow(new Error("empty string"));
	  expect(function() { parser.parse("         "); }).toThrow(new Error("empty string"));
  });

  it("should reject a non-numeric character", function() {
	  expect(function() { parser.parse("1x3"); }).toThrow(new Error("non-numeric character"));
  });

  it("should accept an single-digit string", function() {
	  expect(parser.parse("4")).toEqual(4);
  });

  it("should accept an double-digit string", function() {
	  expect(parser.parse("85")).toEqual(85);
  });

  it("should accept digits and a trailing pence symbol", function() {
	  expect(parser.parse("197p")).toEqual(197);
	  expect(parser.parse("2p")).toEqual(2);	  
  });

  it("should accept a bare number with pounds and pence", function() {
	  expect(parser.parse("1.87")).toEqual(187);
  });

  it("should reject numbers with too many unit separators", function() {
	  expect(function() { parser.parse("1.8.7"); }).toThrow(new Error("non-numeric character"));	  
  });

  it("should ignore leading zeros", function() {
	  expect(parser.parse("000013")).toEqual(13);
	  expect(parser.parse("001.41p")).toEqual(141);
  });

});
