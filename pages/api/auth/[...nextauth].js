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
            
            //VERIFY CONVERSION EMAIL
            if(email.indexOf('@conversion.com.br') == -1) isAllowedToSignIn = false
            
            //SEARCH NOT ALLOWED EMAILS
            if(notAllowedEmails.indexOf(email) > -1) isAllowedToSignIn = false
            
            return isAllowedToSignIn === true ? true : false
        }
    }
}

export default (req, res) => NextAuth(req, res, options)