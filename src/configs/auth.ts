import type {AuthOptions, User} from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import * as process from "process";
import {BASE_API_URL} from "@/configs/constants";
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
                    const res = await fetch(`${BASE_API_URL}/login`, {
                        method: "POST",
                        body: JSON.stringify({...credentials, isGoogleAuth: false}),
                        headers: {"Content-Type": "application/json"}
                    })


                    console.log ("AUTH",res)

                    if (res.status === 200) {
                        const user = await res.json()

                        console.log ("USER", user)
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
                const res = await fetch(`${process.env.BASE_API_URL}/login`, {
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
            if (session.user) {

                // @ts-ignore
                session.user.id = token.uid
                // @ts-ignore
                session.user.accessToken = token.accessToken
                // @ts-ignore
                session.user.status = token.status
            }

            return Promise.resolve(session)
        },
        async jwt({token, user}) {
            if (user){

                token.uid = user.id
                // @ts-ignore
                token.accessToken = user.token;
                // @ts-ignore
                token.status = user.status;
            }
            return token
        }
    },
    session: {
        strategy: 'jwt',
    },

}