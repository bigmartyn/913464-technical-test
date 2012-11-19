Feature: 913464 Technical Test - Factor monetary amounts
  As a user with a number of monetary amounts to factor
  I want to be able enter them into a form
  So I can find out which denominations I need to make up those amounts
  
  Scenario Outline: test whether the right denominations are returned for an amount
  	Given I am on the test page
  	When I enter an <amount>
  	Then I should see the <denominations>

  	Examples: these are all valid amount strings.
    | amount         | denominations                                                |
    | 4              | 2 x 2p                                                       |
    | 85             | 4 x 20p, 2 x 2p, 1 x 1p                                      |
    | 197p           | 1 x £1, 1 x 50p, 2 x 20p, 3 x 2p, 1 x 1p                     |
    | 2p             | 1 x 2p                                                       |
    | 1.87           | 1 x £1, 4 x 20p, 3 x 2p, 1 x 1p                              |
    | £1.23          | 1 x £1, 1 x 20p, 1 x 2p, 1 x 1p                              |
    | £2             | 1 x £2                                                       |
    | £10            | 5 x £2                                                       |
    | £1.87p         | 1 x £1, 1 x 50p, 1 x 20p, 8 x 2p, 1 x 1p                     |
    | £1p            | 1 x £1                                                       |
    | £1.p           | 1 x £1                                                       |
    | 001.41p        | 1 x £1, 2 x 20p, 1 x 1p                                      |
    | 4.235p         | 2 x £2, 1 x 20p, 2 x 2p                                      |
    | £1.257422457p  | 1 x £1, 1 x 20p, 3 x 2p                                      |

  	Examples: these should produce error messages.
    | amount         | denominations                                                |
    |                | empty string                                                 |
    | 1x             | non-numeric character                                        |
    | £1x.0          | non-numeric character                                        |
    | £p             | missing digits                                               |
