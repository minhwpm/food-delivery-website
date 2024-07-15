import NextAuth, {DefaultSession, DefaultUser} from "next-auth";
import {JWT} from "next-auth/jwt"

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      phone?: string
      address?: string
      birthday?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    phone?: string
    address?: string
    birthday?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
