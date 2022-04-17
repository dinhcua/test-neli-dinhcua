// todo.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache()
})
describe('My First Test', () => {
  it('fetches all items', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/',
      body: {
        operationName: 'todos',
        query: `
              query todos {
                todos {
                  id,
                  description,
                  isFinished
                }
              }
            `,
      },
    })
      .its('body.data.todos')
      .should('have.length.gte', 0)
  })
  it('creates one item from server', () => {
    const random = Cypress._.random(1e5)
    const title = `test ${random}`
    cy.log(`Adding item ${title}`)
      .then(() => {
        const query = gql`
        mutation addSingleTodoMutation ($description: String) {
          createTodo(description: $description) {
              description
          }
      }
        `

        // by returning the promise returned by the "client.query"
        // call from the .then callback, we force the test to wait
        // and yield the result to the next Cypress command or assertion
        return client.query({
          query,
          variables: {
            description: title,
          },
          // it is important to AVOID any caching here
          // and fetch the current server data
          fetchPolicy: 'no-cache',
        })
      })
      // use zero timeout to avoid "cy.its" retrying
      // since the response object is NOT going to change
      .its('data.createTodo', { timeout: 0 })
      .should('have.property', 'description')
  })
  it('adds a todo from client', () => {
    // set up the spy on "client.mutate" method
    cy.visit('http://localhost:3000')
      .should('have.property', 'graphqlClient')
      .then((client) => {
        cy.spy(client, 'mutate').as('mutate')
      })
    // have the application make the call by using the UI
    cy.get('.input-todo').type('Test!!!!{enter}')
    // confirm the call has happened with expected variables
    cy.get('@mutate')
      .should('have.been.calledOnce')
      .its('firstCall.args.0.variables')
      .should('deep.include', {
        description: 'Test!!!!',
      })
      .and('have.property', 'description')
  })
  it('delete a todo from server', () => {
    const id = 2
    cy.log(`deleting item ${id}`)
      .then(() => {
        const query = gql`
            mutation DeleteTodo($id: Int!) {
              deleteTodo(id: $id) {
                id
              }
            }
        `

        // by returning the promise returned by the "client.query"
        // call from the .then callback, we force the test to wait
        // and yield the result to the next Cypress command or assertion
        return client.query({
          query,
          variables: {
            id: id,
          },
          // it is important to AVOID any caching here
          // and fetch the current server data
          fetchPolicy: 'no-cache',
        })
      })
      // use zero timeout to avoid "cy.its" retrying
      // since the response object is NOT going to change
      .its('data.deleteTodo', { timeout: 0 })
      .should('have.property', 'id')
  })
  it('delete a todo from client', () => {
    cy.visit('http://localhost:3000')
      .should('have.property', 'graphqlClient')
      .then((client) => {
        cy.spy(client, 'mutate').as('mutate')
      })
    // have the application make the call by using the UI
    cy.get('.delete').first().click({ force: true })
    // confirm the call has happened with expected variables
    cy.get('@mutate')
      .should('have.been.calledOnce')
      .its('firstCall.args.0.variables')
      .should('have.property', 'id')
  })
  it('toggle status of fist todos', () => {
    cy.visit('http://localhost:3000')
      .should('have.property', 'graphqlClient')
      .then((client) => {
        cy.spy(client, 'mutate').as('mutate')
      })
    // have the application make the call by using the UI
    cy.get('.checkmark').first().click({ force: true })
    cy.get('.checkmark').first().click({ force: true })
    cy.get('.tickmark').last().click({ force: true })
    // confirm the call has happened with expected variables
    cy.get('@mutate')
      .should('have.been.calledThrice')
      .its('firstCall.args.0.variables')
      .should('have.property', 'id')
  })
  it('edit description of fist todos', () => {
    cy.visit('http://localhost:3000')
      .should('have.property', 'graphqlClient')
      .then((client) => {
        cy.spy(client, 'mutate').as('mutate')
      })
    // have the application make the call by using the UI
    cy.get('.edit-todo').last().type("Fist edit test!!!")
    // confirm the call has happened with expected variables
    cy.get('@mutate')
      .its('firstCall.args.0.variables')
      .should('have.property', 'id')
  })

})