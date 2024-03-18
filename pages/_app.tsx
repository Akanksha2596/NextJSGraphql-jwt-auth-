import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Cookies from "js-cookie"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client"
import Layout from "@/components/layout"
import { AuthProvider } from "@/context/AuthProvider"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: "https://strapi.training.brainvire.net/graphql",
})

const authLink = setContext((_, { headers }: any) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("token")
  // return the headers to the context so httpLink can read them
  // console.log("Apollo Client URI:", token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
})

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
