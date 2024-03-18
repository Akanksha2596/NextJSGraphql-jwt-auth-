let resolvers = {
  Query: {
    hello: () => "hello user",
  },

  Mutation: {
    SignUp: (_: any, { credentials }: any, { dataSources }: any) => {
      return dataSources.userAuth.signUpUser(credentials)
    },
  },
}

export { resolvers }
