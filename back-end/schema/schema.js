const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Todo" type defines the queryable fields for every todo in our data source.
  type Todo {
    id: Int
    description: String
    isFinished: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "todos" query returns an array of zero or more Todos (defined above).
  # ROOT TYPE
  type Query {
    todos: [Todo],
    todo (id: Int!): Todo
  }

  type Mutation {
      createTodo (description: String) : Todo,
      deleteTodo (id: Int!): Todo,
      editTodo (id: Int!, description: String, isFinished: Boolean) : Todo
  }
`;

module.exports = typeDefs