import gql from "graphql-tag"

// username: "nitu",
// email: "nitu.singh@gmail.com",
// password: "test123",
// first_name: "nitu",
// last_name: "Singh",
// department: "Systems",

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    SignUp(credentials: Credentials): TestUserResponse
  }

  input Credentials {
    username: String
    email: String
    password: String
    first_name: String
    last_name: String
  }

  type TestUserResponse {
    # id: ID
    # username: String
    # email: String
    # first_name: String
    # last_name: String
    user: User
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID
    username: String
    email: String
    first_name: String
    last_name: String
  }
`

export { typeDefs }
