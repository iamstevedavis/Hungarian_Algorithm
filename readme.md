# DISCOUNT OFFERS

## Code Eval Challenge

### https://www.codeeval.com/public_sc/48/

#### Usage

  * You must have node and npm installed
    * https://nodejs.org/en/download/
  * cd into this directory
  1. Install dependencies with
      - npm install
  2. Run app with
      - npm start path_to_file
  3. Run the tests with
      - npm test

#### Requirements
  1. Does the solution run and work
      - Yes
  2. Code cleanliness and organization
      - Pulled out the code that does the work into a class with one function exposed
      - Code is commented and explained
      - Readme details how I arrived at my solution
  3. Testing
      - Testing implemented with mocha
  4. Documentation
      - Code is documented and readme gives credit where credit is due
      - Readme explains how to run the tests, how to run the app and
      how I arrived at my conclusion.
  5. Does the solution work well
      - There are many error checks in place

#### Above and Beyond
  - Functional calc document that solves the hungarian algorithm
  - Functional test harness for programatic entrance (see tests/harness)
  - Tests cover different scenarios
  - Multiple error checks in place
  - Custom exceptions

#### Overview

  This general idea behind this challenge is using the Hungarian Algorithm. This was not immediatly apparent to me. Initially I tried
  to brute force it by plotting out in calc how I would go about selecting a product for each customer and trying to write an
  algorithm to do it. It become very complex quite quickly and I knew there was a better way. I came across a stack overflow article
  by someone with a similar problem http://stackoverflow.com/questions/680524/algorithm-to-find-best-combination where someone recommended both
  the backpack problem and linear programming. After a few failed attempts trying to implement one of the solutions to the backpack problem
  I looked into linear programming. During my research I found out that calc actually has a solver built in. Using this solver I was
  actually able to further my progress and understanding using calc because I was able to quickly get solutions for the values I input
  into calc instead of calculating it manually. You can put in the restrictions and everything. This got  me closer but it was still not the correct answer.
  Researching linear programming led me to trying to implement the simplex algorithm to solve the problem and then eventually the hungarian algorithm once I
  realised my problem was a max assignment problem.

  The calc doc as well as calc doc images can be found in supporting_docs. There are instructions under the heading
  Using the Calc Doc in this readme on how to use the calc doc to solve the cost matrix. You can investigate
  the formulas for the cells if you desire.

#### Considerations
  - I also created a programatic entrance to the application in tests/harness.js
    - It's functional but I did not focus on it.
      - I wanted to indicate that this is something that I considerd and is important.
  - I do not validate the entire file before I start parsing it (aside from its existence)
    - If the file has a semicolon and text on either side, it will parse it as a valid name and product
  - Error Checking
    - If it can't find at least one product and user, it will tell you and exit
    - If it can't find the file, it will tell you and exit

#### Additional Testing
  - Some tests are skipped. The purpose of these tests was to test the app via an implemented programatic entrance.
  - I would like to test with an extremely large file (really this is only testing node readline and fs though)

#### Using the Calc Doc
  - Calc doc is located in supporting_docs
  - Change the values for products in the left cost matrix
  - Go to Tools Menu -> Solver
  - Click Solve
  - The cell K27 will display your result

#### Credit for Hungarian Algorithm Module

  Munkres Package
    https://www.npmjs.com/package/munkres-js

#### Sources

  Simplex Research
    https://en.wikipedia.org/wiki/Simplex_algorithm
    https://github.com/IainNZ/SimplexJS/blob/master/TestSimplexJS.js
    https://github.com/keeganlow/SimpleSimplex/blob/master/nm.js

  Knapsack Research
    https://en.wikipedia.org/wiki/Knapsack_problem
    http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/

  Linear Programming
    https://en.wikipedia.org/wiki/Linear_programming

  Hungarian Algorithm
    https://en.wikipedia.org/wiki/Hungarian_algorithm
    https://brilliant.org/wiki/hungarian-matching/
    http://www.hungarianalgorithm.com/examplehungarianalgorithm.php
