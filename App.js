import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider, client } from './src/graphql/client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
}