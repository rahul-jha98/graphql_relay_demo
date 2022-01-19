import { useEffect, Suspense } from 'react';
import { graphql, useQueryLoader } from 'react-relay';
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import MainUI from './ui';
import FallbackPage from './FallbackPage';

export const AppIsOnlineQuery = graphql`
  query AppIsOnlineQuery {
    isOnline
  }
`;

const App = () => {
  const [isOnlineQueryRef, load] = useQueryLoader(AppIsOnlineQuery);

  useEffect(() => {
    load();
  }, []);

  if (isOnlineQueryRef === null) return null; 
  return (
    <div className="App">
      <ErrorBoundary fallback={<FallbackPage isErrorMode={true} />}>
        <Suspense fallback={<FallbackPage />}>
          <MainUI isOnlineQueryRef={isOnlineQueryRef}/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
