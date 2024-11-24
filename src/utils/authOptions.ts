// next
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// project import
import axios from 'utils/axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/login', {
            email: credentials?.email,
            password: credentials?.password
          });
          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          console.dir(e);
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        username: { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter Username' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
        phone: { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter Phone' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/register', {
            firstname: credentials?.firstname,
            lastname: credentials?.lastname,
            username: credentials?.username,
            email: credentials?.email,
            password: credentials?.password,
            phone: credentials?.phone,
            role: 1
          });

          console.dir(user);
          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          console.dir(e);
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
