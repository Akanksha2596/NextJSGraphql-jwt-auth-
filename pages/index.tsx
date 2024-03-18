import Link from "next/link";
import SignInForm from "@/components/SignInFrom";
export default function Home() {
  return (
    <div>
      <h1>SIGN In </h1>
      <SignInForm />
      {/* <SignupForm /> */}
      <Link href="/register"> Register User</Link>
    </div>
  )
}
