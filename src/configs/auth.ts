import type {AuthOptions, User} from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credential({
            credentials: {
                email: {label: "Email", type: "text", required: true},
                password: {label: "Password", type: "password", required: true}

            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) return null

                try {
                    const res = await fetch(`http://localhost:3301/login`, {
                        method: "POST",
                        body: JSON.stringify({...credentials, isGoogleAuth: false}),
                        headers: {"Content-Type": "application/json"}
                    })

                    if (res.status === 200) {
                        const user = await res.json()


                        console.log(user)
                        return user
                    }
                    return null



                }
                catch (e) {
                    return null
                }

            }

        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({user, account, profile}) {
            if (account.provider === "google") {
                const res = await fetch(`http://localhost:3301/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email: profile.email, isGoogleAuth: true})
                })

                const data = res.json()
                if (res.status === 200) {
                    return true
                }
                else {
                    console.log(data)
                    return false
                }
            }
            else {
                return true
            }
        },
        async session({session, token, user}){
            if (session?.user) {
                session.user.id = token.uid
            }

            return session
        },
        async jwt({token, user}) {
            if (user){
                token.uid = user.id
            }
            return token
        }
    },
    session: {
        strategy: 'jwt',
    },

}