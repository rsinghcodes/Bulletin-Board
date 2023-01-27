import { lazy, Suspense } from 'react';
import { Container, Progress } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/auth';
import Header from './components/Header';
const Home = lazy(() => import('./page/Home'));

function App() {
  return (
    <AuthProvider>
      <Container maxW="container.lg">
        <Header />
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Container>
    </AuthProvider>
  );
}

export default App;
