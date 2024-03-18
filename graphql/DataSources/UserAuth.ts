import { RESTDataSource } from "@apollo/datasource-rest"

export class UserAuth extends RESTDataSource {
  baseURL = "https://strapi.training.brainvire.net/api"

  async signUpUser(Credentials: any) {
    let { username, email, password, first_name, last_name }: any = Credentials

    // const myHeaders = new Headers()
    // myHeaders.append("Content-Type", "application/json")
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA5MTIxMDMyLCJleHAiOjE3MTE3MTMwMzJ9.9sH3Kuz-mQxDJNOWlDEtOlN1e5jY4T9VKpcDBpsilA0"
    // )

    // const raw = JSON.stringify({
    //   confirmed: true,
    //   blocked: false,
    //   role: {
    //     disconnect: [],
    //     connect: [
    //       {
    //         id: 1,
    //         position: {
    //           end: true,
    //         },
    //       },
    //     ],
    //   },
    //   username: username,
    //   email: email,
    //   password: password,
    //   first_name: first_name,
    //   last_name: last_name,
    //   department: "Systems",
    // })

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // }

    // try {
    //   const response = await fetch(
    //     "https://strapi.training.brainvire.net/api/auth/local/register",
    //     requestOptions
    //   )

    //   const result = await response.json()

    //   console.log(result)
    //   return {
    //     token: result?.jwt,
    //     user: result?.user,
    //   }
    // } catch (error) {
    //   console.error(error)
    // }

    return {
      user: {
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      },
    }
  }
}
