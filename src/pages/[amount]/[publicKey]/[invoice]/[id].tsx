import React, { useState, useEffect, useRef } from "react"

import axios from "axios"
import { useRouter } from "next/router"

const QRCode = require("qrcode.react")
// useInterval is a hook described by Dan Abramov here:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// an SSE stream would be better if it worked: https://docs.boltz.exchange/en/latest/api/#streaming-status-updates-of-a-swap
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function Swap() {
  const [swapState, setswapState] = useState("Pending Payment")
  const router = useRouter()

  const { amount, publicKey, id, invoice } = router.query

  useInterval(async () => {
    try {
      const { data } = await axios.post(
        "https://boltz.exchange/api/swapstatus",
        {
          id,
        }
      )
      console.log("🔥", data)
      if (data.status == "transaction.mempool") {
        setswapState("Paid")
      }
    } catch (e) {}
  }, 5000)
  return (
    <div>
      <main className="flex justify-center min-h-screen py-20 bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
        <div>
          <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl">
            <br />
          </h1>

          <h2 className="max-w-4xl px-10 mx-auto mt-8 text-base tracking-tight text-center text-gray-600 sm:text-2xl md:mt-5 md:text-2xl">
            Lightning Payments
          </h2>
          <h1 className="text-center">{swapState}</h1>
          <div className="px-4 sm:px-0">
            <section
              className="w-full mt-6 bg-white rounded-lg grid grid-cols-1 sm:mt-20 sm:grid-cols-2 sm:w-1000"
              style={{
                minHeight: "350px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 30px 60px 0px",
              }}
            >
              <div className="flex flex-col justify-center rounded-l-lg bg-gray-50">
                {router.isReady ? (
                  <QRCode value={invoice} className="mx-12 my-12 space-y-5" />
                ) : (
                  <div>Generating QR </div>
                )}
              </div>

              <div className="px-4 py-24 text-center space-y-5 place-self-center">
                <h3 className="text-3xl font-bold">Info Text 👾</h3>
              </div>
            </section>
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
