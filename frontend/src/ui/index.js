import { graphql, usePreloadedQuery } from "react-relay";
import MainContent from './main';

export default ({ isOnlineQueryRef } ) => {
    const data = usePreloadedQuery(graphql`
            query uiIsOnlineQuery {
                isOnline
            }
        `, isOnlineQueryRef);
    console.log(data);
    return data.isOnline ? 
        <MainContent /> : "Offline";
}
