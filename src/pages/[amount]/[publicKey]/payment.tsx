import axios from "axios"
import { ECPair } from "ecpair"
import { useRouter } from "next/router"

import { getHexString } from "@boltz-core/lib/Utils"

const crypto = require("crypto")

function Page({ data }) {
  return (
    <div>
      <main className="flex justify-center min-h-screen py-20 bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
        <div>
          <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl">
            <br />
          </h1>
          <h1>Unpaid</h1>

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

// This gets called on every request
export async function getServerSideProps() {
  const router = useRouter()
  const { amount, publicKey } = router.query

  // 1. Create the reverse swap (lightning to bitcoin)
  const keys = ECPair.makeRandom()
  const byteBuffer = crypto.randomBytes(32)
  const preimageHash = crypto
    .createHash("sha256")
    .update(byteBuffer)
    .digest("hex")

  const { data } = await axios.post("https://boltz.exchange/api/createswap", {
    type: "reversesubmarine",
    pairId: "BTC/BTC",
    orderSide: "buy",
    invoiceAmount: amount,
    preimageHash,
    claimPublicKey: getHexString(keys.publicKey),
  })

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
