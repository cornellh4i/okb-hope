describe('Onboarding page', () => {
  it('successfully loads', () => {
    cy.visit('/onboarding')
  })

  it('contains a clickable button "Back"', () => {
    cy.visit('/onboarding')
    cy.contains('Back').click()
  })

  it('contains a clickable button "Next"', () => {
    cy.visit('/onboarding')
    cy.contains('Next').click()
  })
})
