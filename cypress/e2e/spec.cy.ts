export {}

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('localhost:3000')
  })
})