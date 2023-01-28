import { Toaster } from 'react-hot-toast';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './components/theme';
import App from './App';

const httpLink = new HttpLink({
  uri: 'https://bulletinboard.onrender.com',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <Toaster />
      <App />
    </ChakraProvider>
  </ApolloProvider>
);
