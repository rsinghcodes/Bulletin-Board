import { lazy, Suspense } from 'react';
import { Container, Progress } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/auth';
import PrivateRoute from './utils/PrivateRoute';

const LoggedInHome = lazy(() => import('./page/LoggedInHome'));
const NotFound = lazy(() => import('./page/NotFound'));

function App() {
  return (
    <AuthProvider>
      <Container maxW="container.lg">
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <LoggedInHome />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Container>
    </AuthProvider>
  );
}

export default App;
