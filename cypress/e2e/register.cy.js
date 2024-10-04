import { errorMessages } from "../../src/components/Register"


describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  // cypress config dosyasına base url olarak siteyi yazarsan aşağıdaki gibi kullanabilirsin
  // beforeEach(() => {
  //   cy.visit('/') 
  // })

  describe('Error Messages', () => {
    it('name input throws error for 2 chars', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type('em')

      cy.contains(errorMessages.ad)
    })

    it('surname input throws error for 2 chars', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="soyad-input"]').type('em')

      cy.contains(errorMessages.soyad)
    })
    it('email input throws error for emre@wit', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="email-input"]').type('emre@wit.')

      cy.contains(errorMessages.email)
    })

    it('password input throws error for 1234', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="password-input"]').type('1234')

      cy.contains(errorMessages.password)
    })
    it('button is disabled for unvalidated inputs', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="submit-button"]').should("be.disabled")


    })

  })

  describe('Form inputs validated', () => {
    it('button enabled for validated inputs', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type('irem')
      cy.get('[data-cy="soyad-input"]').type('karakula')
      cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
      cy.get('[data-cy="password-input"]').type('123Aa*mavi')

      cy.get('[data-cy="submit-button"]').should("not.be.disabled")
    })

    it('submits form on validated inputs', () => {
      // cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type('irem')
      cy.get('[data-cy="soyad-input"]').type('karakula')
      cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
      cy.get('[data-cy="password-input"]').type('123Aa*mavi')
      cy.get('[data-cy="submit-button"]').click()
      cy.get('[data-cy="result-message"]').should("be.visible")
    })





  })

})