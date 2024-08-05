import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string };
        const { firestoreAdmin } = await import('@/helper/firebaseAdmin');
        const usersRef = firestoreAdmin.collection("users")
        const userSnapshot = await  usersRef.where("email", "==", email).get();;

        if (userSnapshot.empty) {
          throw new Error("No user found with this email");
        }

        const userDoc = userSnapshot.docs[0]
        const user = userDoc.data();

        if (!await bcrypt.compare(password, user.password)) {
          throw new Error("Invalid password")
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          birthday: user.birthday,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.address = user.address;
        token.birthday = user.birthday;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.phone= token.phone as string;
      session.user.address = token.address as string;
      session.user.birthday = token.birthday as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}
