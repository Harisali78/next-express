import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers:[
    GoogleProvider({
        clientId:"321679357657-umohtgb1l0i0pj7g5b5k284ed8inq86j.apps.googleusercontent.com" || "",
        clientSecret:"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" || "",
    })
  ]
})

export { handler as GET, handler as POST }