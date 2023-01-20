import { lazy, Suspense } from 'react';
import { Container, Progress } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/auth';

import Header from './components/Header';
const Home = lazy(() => import('./page/Home'));

function App() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
  });

  const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
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

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Toaster />
        <Container maxW="container.lg">
          <Header />
          <Suspense fallback={<Progress size="xs" isIndeterminate />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </Container>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
