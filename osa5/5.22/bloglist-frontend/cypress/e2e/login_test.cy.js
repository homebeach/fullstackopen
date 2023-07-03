describe('Blog ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testi',
      username: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const user2 = {
      name: 'Testi2',
      username: 'testi2',
      password: 'testi2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)     
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.contains('Testi logged in')    
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('testi1')
      cy.get('#password').type('testi1')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()
      cy.contains('testtitle')
    })

    it('A blog can be liked', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()
      cy.contains('button', 'view').first().click();
      cy.contains('button', 'like').first().click();
    })

    it('A blog can be deleted', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()
      cy.contains('button', 'delete').first().click();
    })

    it('A blog can only be deleted by creator', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()
      cy.contains('button', 'Logout').first().click();
      cy.contains('log in').click()
      cy.get('#username').type('testi2')
      cy.get('#password').type('testi2')
      cy.get('#login-button').click()
      cy.contains('button', 'delete').first().click()
      cy.contains('testtitle')
    })    
  })
})