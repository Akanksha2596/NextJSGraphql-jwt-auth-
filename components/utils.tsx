const myHeaders = new Headers()
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA5MTIxMDMyLCJleHAiOjE3MTE3MTMwMzJ9.9sH3Kuz-mQxDJNOWlDEtOlN1e5jY4T9VKpcDBpsilA0"
)

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
}

export async function GetUserBlyId(id: any) {
  try {
    const response = await fetch(
      `https://strapi.training.brainvire.net/api/basic-details?populate=*&filters[users_permissions_user][id][$eq]=${id}`,
      requestOptions
    )
    const result = await response.text()
    return result
  } catch (error) {
    console.error(error)
  }
}
