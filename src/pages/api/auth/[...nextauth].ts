import NextAuth from 'next-auth'
import { MoralisNextAuthProvider } from '@moralisweb3/next'

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      ;(session as { user: unknown }).user = token.user
      return session
    },
  },
})

//store authentication in state to avoid unnecessary re-renders/re-directs

/* localStorage.setItem('accessToken', auth.data?.authenticate.accessToken);
      localStorage.setItem(
        'refreshToken',
        auth.data?.authenticate.refreshToken
      );
 */