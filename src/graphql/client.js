import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { ApolloProvider };
