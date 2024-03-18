import { useState } from "react"
import styles from "../styles/SignupForm.module.css"
import { gql, useMutation } from "@apollo/client"

let Register_User = gql(`
mutation registerUser($username: String!, $email: String!, $password:String!) {  
    register(input: {
      username: $username
      email: $email
      password: $password   
    }) {
      jwt,   
      user {
        id
        username
        email
      }
    }
    }
`)

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
const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  let [RegisterMutation] = useMutation(Register_User, {
    variables: {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    },

    onCompleted(data) {
      console.log("data", data)
    },

    onError(error, clientOptions) {
      console.log("error", error.message)
    },
  })
  const handleChange = (e :any ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e :any) => {
    e.preventDefault()
    let result = await RegisterMutation()

    console.log("result", result)
  }

  return (
    <>
      {JSON.stringify(formData)}
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default RegisterUser
