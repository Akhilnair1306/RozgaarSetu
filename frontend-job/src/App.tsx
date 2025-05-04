import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);

  return (
    // <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {routing}
      </Suspense>
    // </BrowserRouter>
  );
}

export default App;
