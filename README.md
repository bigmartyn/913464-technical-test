## Summary

Write a simple JavaScript application that given a number of pennies will calculate the minimum number of Sterling coins needed to make that amount.

 Eg. 123p = 1 x £1, 1 x 20p, 1 x 2p, 1 x 1p

You should be prepared to spend at least two hours on it.

## Requirements

* Account for only the common £2, £1, 50p, 20p, 2p and 1p coins. Ignore £5 coins.
* You MUST use JavaScript, CSS and HTML to do this. No server-side code is allowed.
* The user interface should consist of a input field that accepts an 'amount' string (Eg. 92p, £2.12) and displays the denominations needed when the user hits 'enter'.
* The application must work in the latest version of Chrome.
* All the files required to run the app should be added to Github (or equivalent).
* Please supply a url to your repo when you are finished.

## What we are looking for

* High quality and maintainable code.
* Use of best practice JavaScript techniques
* “Atomic” commits with good commit messages
* Accessible, semantic, valid HTML.
* Test cases for your code (Eg, qunit, jasmine).
* Well documented and commented code where necessary.
* Follow coding standards.
* Extensible user input parsing and validation.
* To sensibly separate functionality (Eg, input, models, utils, views) following OO paradigms.
* Clean visual design.

## Test Data

In the first column is a string of user input, and in the second the desired integer expressed as pence.

	| input 		| pence (canonical) | description 								|
	| 4 			| 4 				| single digit 								|
	| 85 			| 85 				| double digit 								|
	| 197p 			| 197 				| pence symbol 								|
	| 2p 			| 2 				| pence symbol single digit 				|
	| 1.87 			| 187 				| pounds decimal 							|
	| £1.23 		| 123 				| pound symbol 								|
	| £2 			| 200 				| single digit pound symbol 				|
	| £10 			| 1000 				| double digit pound symbol 				|
	| £1.87p		| 187 				| pound and pence symbol 					|
	| £1p 			| 100 				| missing pence 							|
	| £1.p 			| 100 				| missing pence but present decimal point 	|
	| 001.41p 		| 141 				| buffered zeros 							|
	| 4.235p 		| 424 				| rounding three decimal places to two 		|
	| £1.257422457p | 126 				| rounding with symbols 					|

Likewise, the application should not accept the following inputs,

	| input 	| pence (canonical) | description 			|
	| 			| 0 				| empty string 			|
	| 1x 		| 0 				| non-numeric character |
	| £1x.0p 	| 0 				| non-numeric character |
	| £p 		| 0 				| missing digits 		|
