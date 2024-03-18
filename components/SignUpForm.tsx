import { useState } from "react"
import styles from "../styles/SignupForm.module.css"
import { gql, useMutation } from "@apollo/client"

let Sign_Up_User = gql(`
mutation createUser($username: String!, $email: String!, $password:String!, $firstName:String!, $lastName:String!, $role:ID!, $department:JSON!) {
  createUsersPermissionsUser(data: {
    username: $username,
    email:  $email
    password: $password
    first_name: $firstName
    last_name: $lastName
    role: $role
    department:$department
  }) {
    data{
      attributes{
        username,
        email,
        first_name,
        last_name,
        role{
          data{
            attributes{
              name
            }
          }
        }
        department
      }
    }
  }
}

`)

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  let [SignUpMutation] = useMutation(Sign_Up_User, {
    variables: {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: "4",
      department: ["Systems"], // Assuming department is an array
    },

    onCompleted(data) {
      console.log("data", data)
    },

    onError(error, clientOptions) {
      console.log("error", error.message)
    },
  })
  const handleChange = (e :any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e :any ) => {
    e.preventDefault()
    let result = await SignUpMutation()

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
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm
