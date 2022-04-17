import './App.css';
import InputTodo from './components/InputTodo/InputTodo';
import Todos from './components/Todos/Todos';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//Instead of using cy.request directly, we can fetch the items using the same GraphQL 
//client the application is using! Just make sure to set the "cache" to false to avoid race 
//conditions between the application and the test runner's client's memory caches.
export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache()
})
if (window.Cypress) {
  window.graphqlClient = client
}
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>TODO</h1>
        <InputTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
