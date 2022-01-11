import { useEffect } from 'react';
import { graphql, useQueryLoader } from 'react-relay';
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

  return (
    <div className="App">
      { isOnlineQueryRef !== null ? <MainUI isOnlineQueryRef={isOnlineQueryRef} /> : null }
      
    </div>
  );
}

export default App;
