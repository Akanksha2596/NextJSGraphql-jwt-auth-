import React from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
export default function Welcomepage() {
  let router = useRouter()
  function handelSignout() {
    Cookies.remove("token")
    console.log("clicked")

    router.push("/Login")
  }
  return (
    <div>
      Welcomepage user
      <button onClick={handelSignout}>Signout</button>
    </div>
  )
}
