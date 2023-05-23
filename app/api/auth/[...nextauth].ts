import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
interface IClientProvider {
  clientId: string;
  clientSecret: string;
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as IClientProvider),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
