import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"

function Swap() {
  const [swapState, setswapState] = useState("nah")

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    console.log("id", id)
    const sse = new EventSource(
      "https://boltz.exchange/api/swapstatus?id=" + id
    )

    sse.addEventListener("message", (e) => {
      console.log("Default message event\n", e)
    })

    function getRealtimeData(data) {
      console.log("🔥", data)
      setswapState(data.status)
    }
    console.log("🔥 about to onmessage")
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data))

    sse.onerror = () => {
      // error log here

      sse.close()
    }
    return () => {
      sse.close()
    }
  })
  return (
    <div>
      <main className="flex justify-center min-h-screen py-20 bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
        <div>
          <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl">
            Whhaaa
            <br />
          </h1>
          <h1>{swapState}</h1>

          <h2 className="max-w-4xl px-10 mx-auto mt-8 text-base tracking-tight text-center text-gray-600 sm:text-2xl md:mt-5 md:text-2xl">
            Lightning Payments
          </h2>

          <div className="px-4 sm:px-0">
            <section
              className="w-full mt-6 bg-white rounded-lg grid grid-cols-1 sm:mt-20 sm:grid-cols-2 sm:w-1000"
              style={{
                minHeight: "350px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 30px 60px 0px",
              }}
            >
              <div className="flex flex-col justify-center rounded-l-lg bg-gray-50">
                <FeatureList>
                  <Feature main="Tailwind CSS">
                    Integrate Lightning Payments{" "}
                    <InfoText text="with a single line of code" />
                  </Feature>
                </FeatureList>
              </div>

              <div className="px-4 py-24 text-center space-y-5 place-self-center">
                <h3 className="text-3xl font-bold">Get it 👇</h3>
              </div>
            </section>
            <p className="mt-6 text-xs font-medium text-center text-gray-600">
              Test Popup{" "}
              <a
                className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline"
                href="javascript:window.open('http://localhost:3000/api/test', 'yourWindowName', 'width=200,height=350');"
              >
                Click Me
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FeatureListProps {
  children: React.ReactNode
}

function FeatureList({ children }: FeatureListProps) {
  return <ul className="px-12 py-12 space-y-5">{children}</ul>
}

function Feature({ children, main }) {
  return (
    <li className="flex items-center">
      <CheckIcon className="flex-shrink-0 hidden w-5 h-5 p-1 text-gray-100 bg-blue-600 rounded-full sm:inline hiddden" />
      <p className="hidden ml-3 text-lg text-gray-600 sm:inline">{children}</p>

      <p className="mx-auto sm:hidden">
        <InfoText text={main} />
      </p>
    </li>
  )
}

function InfoText({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-2 font-medium text-gray-700 bg-gray-100 rounded-md">
      <CheckIcon className="inline-flex flex-shrink-0 w-5 h-5 p-1 mr-3 text-gray-100 bg-blue-600 rounded-full sm:hidden" />
      {text}
    </span>
  )
}

function CheckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

export default Swap
