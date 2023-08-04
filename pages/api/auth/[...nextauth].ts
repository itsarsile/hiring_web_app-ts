import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


interface UserCredentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize: async (credentials: UserCredentials, req) => {
                const { email, password } = credentials
                try {
                    const response = await fetch(`http://localhost:5000/users?email=${email}`)
                    if (!response.ok) {
                        throw new Error("Error fetching user data")
                    }

                    const userData = await response.json()
                    if (userData && userData.length > 0 && userData[0].password === password) {
                        return {
                            id: userData[0].id,
                            name: userData[0].name,
                            photo: userData[0].photo,
                            roles: userData[0].roles,
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error)
                    return null;
                }
            }

        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        session: async ({ session, token }) => {
            // console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    photo: token.photo,
                    roles: token.roles,
                },
            };
        },
        jwt: async ({ token, user }) => {
            // console.log("JWT CALLBACK: ", { token, user })
            if (user) {
                token.id = user.id
                token.photo = user.photo
                token.roles = user.roles
            }
            return token
        }
    }
}

export default NextAuth(authOptions)