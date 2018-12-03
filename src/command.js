/* eslint-disable no-undef */

function compareSnapshotCommand() {
  Cypress.Commands.add('compareSnapshot', (name, args = {}) => {
    // take snapshot
    if (args.elementSelector) {
      cy.get(`${args.elementSelector}`).screenshot(`${name}`);
    } else {
      cy.screenshot(`${name}`);
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
