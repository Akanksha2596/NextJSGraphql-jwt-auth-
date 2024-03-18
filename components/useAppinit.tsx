import { useEffect } from "react"
import { gql, useQuery } from "@apollo/client"
import { useAuthContext } from "../context/AuthProvider"
const userInfoQuery = gql`
  query getUSerInfo {
    me {
      email
      id
      username
    }
  }
`

export const useAppInit = () => {
  const { loading, data } = useQuery(userInfoQuery)
  const { setAuthInfo }: any = useAuthContext()

  useEffect(() => {
    const handleSession = async () => {
      setAuthInfo(data)
    }

    handleSession()
  }, [setAuthInfo])

  return { loading, data }
}
