const axios = require('axios');
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import checkAirTable from './checkAirTable.tsx'
import registerLNBits from './registerLNBits.tsx'
/* NextAuth is great. This file is okay
 * Keeps track of Users in Airtable and LNBits separately
*/
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user
      await checkAirTable(email) //Get AirTable account info
      return true;
    }
  }
})