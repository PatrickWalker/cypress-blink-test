/* eslint-disable no-undef */

function compareSnapshotCommand() {
  Cypress.Commands.add('compareSnapshot', (name, args = {}) => {
    // realistically we should just bang the args straight in rather than recreating
    const blackoutVal = args.blackout ? args.blackout : [];
    const screenOptions = { blackout: blackoutVal };
    // take snapshot
    if (args.elementSelector) {
      cy.get(`${args.elementSelector}`).screenshot(`${name}`, screenOptions);
    } else {
      cy.screenshot(`${name}`, screenOptions);
    }

    // run visual tests
    const options = {
      fileName: name,
      specDirectory: Cypress.spec.name,
    };
    cy.task('compareSnapshotsPlugin', options).then((results) => {
      if (results.code <= 1) throw new Error(`${name} images are different`);
    });
  });
}

/* eslint-enable no-undef */

module.exports = compareSnapshotCommand;
