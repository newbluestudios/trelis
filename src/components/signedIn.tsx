import React, { useState } from "react"

import Head from "next/head"

import SignInOut from "./signInOut"

export default function Component() {
  const [companyName, setCompanyName] = useState("")
  const [amount, setAmount] = useState(50000)
  const [pubKey, setPubKey] = useState("")
  return (
    <div>
      <Head>
        <title>Next.js advanced start template.</title>
        <meta
          name="description"
          content="Use tailwind css, eslint, prettier & absolute imports instantly.
            Easily extendable zero-config template for pros and beginners."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center min-h-screen py-20 bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
        <div>
          <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl">
            Trelis
            <br />
          </h1>

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
                {/* <InfoText text="Company Name" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                ></input> */}
                <InfoText text="Payment Amount - min 50000 Satoshis" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
                <InfoText text="Receiving Wallet Address" />
                <input
                  type="text"
                  value={pubKey}
                  onChange={(e) => setPubKey(e.target.value)}
                ></input>
              </div>

              <div className="px-4 py-24 text-center space-y-5 place-self-center wx-50">
                <h3 className="text-3xl font-bold">Your Payment Link</h3>
                <div className="inline-flex rounded-md shadow-sm">
                  {"trelis.com/api/" + amount + "/" + pubKey + "/payment"}
                </div>
              </div>
            </section>
            <div className="inline-flex rounded-md shadow-sm">
              <SignInOut className="inline-flex items-center px-4 py-4 font-medium text-white bg-blue-600 border border-transparent leading-6 transition duration-150 ease-in-out rounded-md sm:px-10 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-blue-400 active:bg-blue-700 focus:ring-4" />
            </div>
            <p className="mt-6 text-xs font-medium text-center text-gray-600"></p>
          </div>
        </div>
      </main>
    </div>
  )
}

function InfoText({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-2 font-medium text-gray-700 bg-gray-100 rounded-md">
      {text}
    </span>
  )
}
