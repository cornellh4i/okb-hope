describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/')
  })

  it('has a sign in button', () => {
    cy.visit()
    cy.contains('Sign In').click()
  })
})
