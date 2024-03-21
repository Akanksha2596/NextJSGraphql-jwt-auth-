import Link from "next/link";
import SignInForm from "@/components/SignInFrom";
import RegisterUser from "@/components/RegisterUser";
export default function Home() {
  return (
    <div> 
      {/* <SignupForm /> */}
      <Link href="/register"> <h1>Register User</h1></Link>
      <SignInForm />
    </div>
  )
}
