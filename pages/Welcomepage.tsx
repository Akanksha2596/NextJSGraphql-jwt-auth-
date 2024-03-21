import React from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import BasicDetails from "@/components/BasicDetails"
export default function Welcomepage() {
  let router = useRouter()
  function handelSignout() {
    Cookies.remove("token")
    console.log("clicked")

    router.push("/login")
  }
  return (
    <div>
      Welcomepage user
      <button onClick={handelSignout}>Signout</button>
      <BasicDetails/>
    </div>
  )
}
