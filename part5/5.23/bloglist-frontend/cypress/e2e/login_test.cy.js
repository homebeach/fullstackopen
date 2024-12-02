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
      cy.contains('button', 'view').first().click()
      cy.contains('button', 'like').first().click()
    })

    it('A blog can be deleted', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()
      cy.contains('button', 'delete').first().click()
    })

    it('A blog can only be deleted by the creator', function() {
      // Step 1: Creator logs in and creates a blog
      cy.get('#new-blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-button').click()

      // Verify the blog is created and the delete button is visible for the creator
      cy.contains('testtitle')
        .parent()
        .find('[data-testid^="delete-button-"]') // Matches the delete button with a specific data-testid
        .should('be.visible')

      // Step 2: Creator logs out
      cy.contains('button', 'Logout').click()

      // Step 3: Another user logs in
      cy.contains('log in').click()
      cy.get('#username').type('testi2')
      cy.get('#password').type('testi2')
      cy.get('#login-button').click()

      // Verify the delete button is not visible for the non-creator
      cy.contains('testtitle')
        .parent()
        .find('[data-testid^="delete-button-"]') // Matches the delete button
        .should('not.exist')

      // Verify the blog still exists
      cy.contains('testtitle').should('exist')
    })

    it('Blogs are sorted based on number of likes', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('third')
      cy.get('#author').type('third')
      cy.get('#url').type('third')
      cy.get('#create-button').click()
      cy.contains('button', 'view').first().click()
      cy.contains('button', 'like').first().click()
      cy.contains('third').parent().should('contain', '1')

      cy.get('#title').clear()
      cy.get('#title').type('second')
      cy.get('#author').clear()
      cy.get('#author').type('second')
      cy.get('#url').clear()
      cy.get('#url').type('second')
      cy.get('#create-button').click()
      cy.get('.blog-container')
        .eq(1)
        .contains('button', 'view').click()
      cy.get('.blog-container')
        .eq(1)
        .contains('button', 'like').click().click()
      cy.contains('second').parent().should('contain', '2')

      cy.get('#title').clear()
      cy.get('#title').type('first')
      cy.get('#author').clear()
      cy.get('#author').type('first')
      cy.get('#url').clear()
      cy.get('#url').type('first')
      cy.get('#create-button').click()
      cy.get('.blog-container')
        .eq(2)
        .contains('button', 'view').click()
      cy.get('.blog-container')
        .eq(2)
        .contains('button', 'like').click().click().click()
      cy.contains('first').parent().should('contain', '3')

      cy.get('.blog-container')
        .eq(0)
        .contains('first')
      cy.get('.blog-container')
        .eq(1)
        .contains('second')
      cy.get('.blog-container')
        .eq(2)
        .contains('third')

    })
  })
})