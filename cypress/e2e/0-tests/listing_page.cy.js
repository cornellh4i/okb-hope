describe('Listing page', () => {
  it('successfully loads', () => {
    cy.visit('/listings')
  })

  it('gets/updates name filter', () => {
    cy.visit('/listings')

    // Get an input, type into it
    cy.get('.filter-name').type('Erica Kelly')

    //  Verify that the value has been updated
    cy.get('.filter-name').should('have.value', 'Erica Kelly')
  })

  it('gets/updates age filter', () => {
    cy.visit('/listings')

    // Get an input, selects option
    cy.get('.filter-age').select('24-32')

    //  Verify that the value has been updated
    cy.get('.filter-age').should('have.value', '24-32')
  })

  it('gets/updates languages filter', () => {
    cy.visit('/listings')

    // Get an input, selects multipl options
    cy.get('.filter-languages').select(['English', 'Akan'])

    //  Verify that the value has been updated
    cy.get('.filter-languages')
      .invoke('val')
      .should('deep.equal', ['English', 'Akan'])
  })

  it('gets/updates weekly availabilities filter', () => {
    cy.visit('/listings')
    // select options with index 1 and 3
    cy.get('.filter-availability').select([1, 3])

    cy.get('.filter-availability').invoke('val').should('deep.equal', [1, 3])
  })

  it('has "About Me" in profiles', () => {
    cy.visit('/listings')
    cy.contains('About Me')
  })

  it('has "Specialties" in profiles', () => {
    cy.visit('/listings')
    cy.contains('Specialties')
  })
})
