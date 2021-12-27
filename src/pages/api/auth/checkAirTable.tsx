var Airtable = require("airtable")
const axios = require("axios")
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.USER_BASE
)

export default async (email) => {
  // Find the User
  // await base("Users")
  //   .select({
  //     filterByFormula: `email = "${email}"`,
  //   })
  //   .firstPage((err, records) => {
  //     console.log(records, "🤐")
  //     // if not found, register a new User
  //     if (!records?.length) {
  //       newAirTableAndLNBitsUser(email)
  //     }
  //   })
}

// First time signing in
// async function newAirTableAndLNBitsUser(email) {
//   // 1 Make a new user in AirTable
//   const records = await base("Users").create([{ fields: { email } }])
//   records.forEach(async function (record) {
//     console.log("👻", record.getId())

//     const AirTableID = record.getId()

//     // 2 Make a new user in LNBits
//     try {
//       const response = await axios.post(
//         process.env.URL + "/usermanager/api/v1/users",
//         {
//           admin_id: process.env.ADMIN_ID,
//           user_name: "waldo",
//           wallet_name: "wally",
//           email,
//         },
//         {
//           headers: {
//             "X-Api-key": process.env.X_API_KEY,
//           },
//         }
//       )
//       console.log(response.data, "🎉")
//       const { id, name, admin, email, password } = response.data

//       //Save their LNBIts id to AirTable - very important
//       const records = await base("Users").update([
//         {
//           id: AirTableID,
//           fields: {
//             id,
//           },
//         },
//       ])
//       console.log(records, "🎉🎉")
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }
