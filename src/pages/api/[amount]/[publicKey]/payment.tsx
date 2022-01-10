import axios from "axios"
import { Transaction, address, networks } from "bitcoinjs-lib"
import { ECPair } from "ecpair"

import { detectSwap } from "@boltz-core/lib/Boltz"
import { OutputType } from "@boltz-core/lib/consts/Enums"
import { ClaimDetails } from "@boltz-core/lib/consts/Types"
import { constructClaimTransaction } from "@boltz-core/lib/swap/Claim"
import { getHexString } from "@boltz-core/lib/Utils"
import { getHexBuffer } from "@boltz-core/lib/Utils"

const crypto = require("crypto")

const reverseBuffer = (input: Buffer): Buffer => {
  const buffer = Buffer.allocUnsafe(input.length)

  for (let i = 0, j = input.length - 1; i <= j; i += 1, j -= 1) {
    buffer[i] = input[j]
    buffer[j] = input[i]
  }

  return buffer
}

const payment = async function (swapData, byteBuffer, keys, req, res) {
  // 2. Create an empty object to hold the result of https://boltz.exchange/api/swapstatus
  let data = { status: "👾", transaction: { hex: "👾", id: "👾" } }
  const { publicKey } = req.query

  do {
    console.log("👾 checking..")

    //check if the invoice has been paid every 15 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000))
    try {
      const resp = await axios.post("https://boltz.exchange/api/swapstatus", {
        id: swapData.id,
      })
      data = resp.data
    } catch (e) {}
  } while (data.status != "transaction.mempool")

  console.log("👾", data)

  // 3. After the lightning invoice has been paid, get the transaction id & hex to detect the swap
  const redeemScript = getHexBuffer(swapData.redeemScript)
  const transaction = Transaction.fromHex(data.transaction.hex)
  const { vout, value, script } = detectSwap(
    // Buffer.from(redeemScript, "hex"),
    redeemScript,
    transaction
  )
  console.log("👾", vout)
  console.log("👾", value)
  console.log("👾", script)
  // 4. Construct claim details with the information collected/generated above
  const utxos: ClaimDetails[] = [
    {
      txHash: reverseBuffer(getHexBuffer(data.transaction.id)),
      vout,
      value,
      preimage: getHexBuffer(byteBuffer),
      keys,
      redeemScript,
      type: OutputType.Bech32,
      script,
    },
  ]
  // 5. Get a fee estimation for bitcoin, set receiving wallet's address, and constructClaimTransaction()
  const {
    data: { BTC: feePerByte },
  } = await axios.get("https://boltz.exchange/api/getfeeestimation")
  //display in usd rather than sats ~75k
  //by clicking generate you agree to terms of service
  //merchant name on infotext
  //logo
  //clickup
  const destinationScript = address.toOutputScript(
    // "bc1qj9h9axlly4k3p5t4svl50ttpk63qyte9dzg2p7",
    publicKey,
    networks.bitcoin
  )

  const tx = constructClaimTransaction(
    utxos,
    destinationScript,
    feePerByte,
    false
  )
  console.log("👾", tx)
  const transactionHex = tx.toHex()
  console.log("👾", transactionHex)
  const response = await axios.post(
    "https://boltz.exchange/api/broadcasttransaction",
    {
      currency: "BTC",
      transactionHex,
    }
  )
  console.log("👾", response)

  res.end()
}

export default async function boltz(req, res) {
  const { amount, publicKey } = req.query

  // 1. Create the reverse swap (lightning to bitcoin)
  const keys = ECPair.makeRandom()
  const byteBuffer = crypto.randomBytes(32)
  const preimageHash = crypto
    .createHash("sha256")
    .update(byteBuffer)
    .digest("hex")
  console.log("👾", amount, publicKey)
  // let swapData
  // try {
  const { data: swapData } = await axios.post(
    "https://boltz.exchange/api/createswap",
    {
      type: "reversesubmarine",
      pairId: "BTC/BTC",
      orderSide: "buy",
      invoiceAmount: parseInt(amount),
      preimageHash,
      claimPublicKey: getHexString(keys.publicKey),
    }
  )
  console.log("👾", swapData)

  payment(swapData, byteBuffer, keys, req, res)
  // } catch (e) {
  //   console.log(e)
  // }

  res.writeHead(302, {
    Connection: "keep-alive",
    "Content-Encoding": "none",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Location:
      "/" +
      amount +
      "/" +
      publicKey +
      "/" +
      swapData.invoice +
      "/" +
      swapData.id,
  })

  res.write("<h1>Heado</h1>")
}
