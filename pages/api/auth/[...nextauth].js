import NextAuth from 'next-auth'
import Google from "next-auth/providers/google"

let id_token = ''

const notAllowedEmails = [
    'gwt@conversion.com.br',
    'ga@conversion.com.br',
    'analytics@conversion.com.br',
    'ga_1@conversion.com.br',
    'service@conversion.com.br'
]

const options = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, ...rest }) {

            id_token = rest.account?.id_token

            //ID,NAME,EMAIL,IMAGE
            const { email } = user

            //CONTROLLER CONST
            const isAllowedToSignIn = true

            //VERIFY CONVERSION EMAIL
            if (email.indexOf('@conversion.com.br') == -1) isAllowedToSignIn = false

            //SEARCH NOT ALLOWED EMAILS
            if (notAllowedEmails.indexOf(email) > -1) isAllowedToSignIn = false

            return isAllowedToSignIn === true ? true : false
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) token.id_token = account.id_token
            
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.id_token = token.id_token
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, options)