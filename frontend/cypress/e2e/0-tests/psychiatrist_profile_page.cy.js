describe('Psychiatrist profile page', () => {
  it('successfully loads', () => {
    cy.visit('/example_psychiatrist_id')
  })

  it('has an availability section', () => {
    cy.visit('/example_psychiatrist_id')
    cy.contains('Availability')
  })

  it('has an contact info section', () => {
    cy.visit('/example_psychiatrist_id')
    cy.contains('Contact Info')
  })

  it('has a button to book appointments', () => {
    cy.visit('/example_psychiatrist_id')
    cy.contains('Book Appointment').click()

    // url should change
    cy.url().should('include', '/booking')
  })

  it('has a button to message professional', () => {
    cy.visit('/example_psychiatrist_id')
    cy.contains('Message Professional').click()

    // url should change
    cy.url().should('include', '/messaging')
  })
})
