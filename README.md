# Code assesment

You've been asked to refactor the attached function to make it easier to read and understand without 
changing its functionality. For this task, you should:

Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. 
We typically use `jest`, but if you have another library you prefer, feel free to use it.

Refactor the function to be as "clean" and "readable" as possible. 
There are many valid ways to define those words - use your own personal definitions, 
but be prepared to defend them. Note that we do like to use the latest JS language 
features when applicable.

Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically 
your version is more "readable" than the original.


## Running the assesment

To run this code use the following commands

```sh
npm i
npm run test
```

To see the coverage use:

```sh
npm  test -- --coverage
```

The tests have a 100% coverage.

```pre
----------|---------|----------|---------|---------|-------------------                                                                                                                                    
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                     
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 | 
 index.js |     100 |      100 |     100 |     100 | 
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

## Running original code
The original source code is located in `original.js`, the updated function
is located in `index.js`, tests are located in `index.test.js`. If you want
to test the original function instead of the modified function, uncomment the
first line of the `index.test.js` file.


```js
//const { deterministicPartitionKey } = require("./original")
const { deterministicPartitionKey } = require("./index")
const { Chance } = require("chance")
const crypto = require("crypto");
```




