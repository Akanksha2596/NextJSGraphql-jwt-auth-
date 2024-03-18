import gql from "graphql-tag"
import { useMutation, useQuery } from "@apollo/client"
import React, { cache, useState } from "react"
import Cookies from "js-cookie"
import { useAuthContext } from "@/context/AuthProvider"
import { useRouter } from "next/router"

// Import the CSS file
let UserSignIn = gql(`
mutation UserSignIn($input: UsersPermissionsLoginInput!)
 {login(input: $input) {
  jwt
  user {
    email
    id
  }
}}
`)

const userInfoQuery = gql`
  query getUSerInfo {
    me {
      email
      id
      username
    }
  }
`
const GetUserBy_Id = gql`query ($usersPermissionsUserId: ID) {
  usersPermissionsUser(id: $usersPermissionsUserId) {
    data {
      attributes {
        email
      }
    }
  }
}
`
function GetAllUsers() {
  const [Users, setUsers] = React.useState()
  const getUsers = gql`
    query getUsers {
      usersPermissionsUsers {
        data {
          attributes {
            email
            first_name
            last_name
          }
        }
      }
    }
  `

  const { data, loading, error } = useQuery(getUsers, {
    onCompleted(data) {
      console.log(data)
      setUsers(data?.usersPermissionsUsers?.data)
    },
    onError(error) {
      console.error(error)
    },
  })

  return (
    <div>
      {loading && <p>....loading</p>}
      {error && <p>Error: {error.message}</p>}
      {JSON.stringify(data)}
      <button>get users </button>
    </div>
  )
}
function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userInfo, setUserInfo] = React.useState({})
  let router = useRouter()
  // let { loading, data }: any = useAppInit()

  const { loading, data } = useQuery(userInfoQuery, {
    onCompleted(data) {
      setAuthInfo(data)
    },
  })

  let { authInfo, isAuthenticated, setAuthInfo }: any = useAuthContext()
  let [SignInMutation, { error, loading: isloading }] = useMutation(
    UserSignIn,
    {
      variables: {
        input: {
          identifier: email,
          password: password,
        },
      },

      onCompleted(data) {
        let { login } = data

        router.push("/Welcomepage")
        // console.log("data", data?.login?.jwt)
        console.log("authInfo", authInfo)

        Cookies.set("token", data?.login?.jwt)

        setUserInfo({ user: login.user, jwt: login.jwt })
      },
      onError(error) {
        console.log("error", error)
      },
    }
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    SignInMutation()

    // Here you can add code to handle sign-in logic, such as authentication
    console.log("Submitted:", { email, password })
  }

  function handelSignout() {
    Cookies.remove("token")

    console.log("clicked")
  }
  return (
    <div className="signin-form-container">
      <button onClick={handelSignout}>Signout</button>
      <h2>Sign In Form</h2>
      <p> {JSON.stringify(authInfo)}</p>
      {userInfo && <h1>User :</h1>}

      {isloading && <p>....Signing user</p>}
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          autoComplete="true"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          onClick={() => console.log("clickced")}
          type="submit"
          value="Sign In"
        >
          Sign in
        </button>
      </form>
      <GetAllUsers />
    </div>
  )
}

export default SignInForm
