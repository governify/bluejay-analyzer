# bluejay-analyzer
Bluejay-analyzer provides insights into some performance aspects of the bluejay infrastructure.

## Quick start
Clone this repository
```
git clone https://github.com/governify/bluejay-analyzer.git
```
Install the dependencies (from the root directory)
```
npm install
```
## Pre-requirements
If you are going to launch performance tests **locally**, you must have bluejay infrastructure up and running with a project with an agreement created.

If you are going to launch tests in **production**, make sure that the server is accessible. You must have a project created with an active agreement.

## Usage
First of all, you must visualize the file directory table and read de Usage and objetive of the tests that you are going to lunch.

To execute a test, launch the following command with the path of the file you want to launch (from the root directory). All tests are collected in the file directory table and what they are for.
```
node {fileDirectory}
```
All relevant information will be displayed by console. 

## File directory table
| Directory                                | Objective and Usage                                                                                                                                                      |
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ./registry/computationTimeWithXHours.js  | This file provides information about the computation time in different periods (1 hour, 2 hours, 4 hours, 8 hours, 16 hours, and 24 hours). Test how times increase with respect to the number of hours. Configure the config objects with the required information in this file before launch the test.  |
| ./registry/automaticComputation.js | This file tests the system's ability to perform calculations one after another. Configure the config objects with the required information in this file before launch the test. |



