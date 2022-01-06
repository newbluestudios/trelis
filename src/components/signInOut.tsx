import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>
          Sign out of {session.user.email}
        </button>
      </>
    )
  }
  return (
    <>
      <button
        className="inline-flex items-center px-4 py-4 font-medium text-white bg-blue-600 border border-transparent leading-6 transition duration-150 ease-in-out rounded-md sm:px-10 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-blue-400 active:bg-blue-700 focus:ring-4"
        onClick={() => signIn()}
      >
        Sign-in/Sign-up
      </button>
    </>
  )
}
