import { graphql, usePreloadedQuery } from "react-relay";
import MainContent from './main';
import { AppIsOnlineQuery } from "../App";
import FallbackPage from "../FallbackPage";

export default ({ isOnlineQueryRef } ) => {
    const data = usePreloadedQuery(AppIsOnlineQuery, isOnlineQueryRef);
        
    return data.isOnline ? 
        <MainContent /> : <FallbackPage isErrorMode={false}/>;
}
