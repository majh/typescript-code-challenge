# Sinefa TypeScript Challenge Instructions

Write a Node script that transforms `data.json` into `data-transformed.json`. Have a look at `example-output.json` to show how the data should be transformed.


## Build and Run

```
npm run transform
```

## Unit tests
Normally I would have a number of unit tests to support, but here there are none.

## General Approach and Assumptions

- Solution should be implemetned in TypeScript.
- Read JSON `data.json` async from current directory, convert data async, write `data-transformed.json` async to current directory.
- Solution should be run from the command line using `npm run`.
- Solution should be non-blocking.
- Solution should  write output file directly to project directory unless otherwise specified.

## Criteria

Your work will be evaluated primarily on:

- Consistency of coding style.
- Correct use of promises, including proper error handling.
- Correct use of TypeScript, including interface/object definitions.
- Absence of "callback hell".
- Correct and complete unit test coverage.
- General quality of code and technical communication.

## How to submit your work

 1. Fork this project on github.
 2. Update this README.md file with instructions on how to build/test/run your script.
 3. When you're finished, send us the URL of your public repository.

