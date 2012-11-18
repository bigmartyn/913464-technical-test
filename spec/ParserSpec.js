describe("Parser", function() {
  var parser;

  beforeEach(function() {
    parser = new CurrencyParser();
  });

  it("should reject an empty string", function() {
	  expect(function() {
		  parser.parse("");
	  	  }).toThrow(new Error("empty string"));
  });

});
