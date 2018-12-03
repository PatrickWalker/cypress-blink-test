# Cypress Visual Regression

[![NPM](https://nodei.co/npm/cypress-blink-test.png)](https://nodei.co/npm/cypress-blink-test/)


Module for adding visual regression testing to [Cypress](https://www.cypress.io/).

> **NOTE:** 
This is forked from [mjhea0](https://github.com/mjhea0/cypress-visual-regression)
who did all the hard work this was created just to remove the dependency on image-magik to see if it could be done directly with blink so no external install needed

I've currently taken the type switch out so the base images is a manual process.

## Getting Started

Install:

```sh
$ npm install cypress-blink-test
```

Add the following config to your *cypress.json* file:

```json
{
  "screenshotsFolder": "cypress/snapshots/actual",
  "trashAssetsBeforeRuns": true
}
```

Add the plugin to *cypress/plugins/index.js*:

```javascript
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

module.exports = (on) => {
  getCompareSnapshotsPlugin(on);
};
```

Add the command to *cypress/support/commands.js*:

```javascript
const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();
```

## To Use

Add `cy.compareSnapshot('home');` in your tests specs whenever you want to test for visual regressions, making sure to replace `home` with a relevant name. You can also add an optional error threshold: Value can range from 0.00 (no difference) to 1.00 (every pixel is different). So, if you enter an error threshold of 0.50, the test would fail only if 0.51 percent of pixels are different.


Find regressions:

```sh
$ ./node_modules/.bin/cypress run 
```

## Example

![example](./cypress-visual-regression.gif)

## TODO

1. Allow end user to customize options (screenshot directory)
1. Test functionality of taking screenshots without running visual regression
1. Prevent "base" tests runs from actually running the regular Cypress tests
