import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  }),
});

export { ApolloProvider };
