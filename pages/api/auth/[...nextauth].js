import NextAuth from 'next-auth'
import Google from "next-auth/providers/google"


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
        async signIn({ user }) {
            //ID,NAME,EMAIL,IMAGE
            const { email } = user

            //CONTROLLER CONST
            const isAllowedToSignIn = true
            
            //SEARCH NOT ALLOWED EMAILS
            if(notAllowedEmails.indexOf(email) > -1) return false

            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        }
    }
}

export default (req, res) => NextAuth(req, res, options)