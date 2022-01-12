import { useEffect, Suspense } from 'react';
import { graphql, useQueryLoader } from 'react-relay';
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import MainUI from './ui';

const AppIsOnlineQuery = graphql`
  query AppIsOnlineQuery {
    isOnline
  }
`;

const App = () => {
  const [isOnlineQueryRef, load] = useQueryLoader(AppIsOnlineQuery);

  useEffect(() => {
    load();
  }, [load]);

  if (isOnlineQueryRef === null) return null; 
  return (
    <div className="App">
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        <Suspense fallback={<h1>Loading</h1>}>
          <MainUI isOnlineQueryRef={isOnlineQueryRef}/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
