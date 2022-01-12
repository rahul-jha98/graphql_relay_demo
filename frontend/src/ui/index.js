import { graphql, usePreloadedQuery } from "react-relay";
import SuspenseDemo from "./suspensedemo";
import QuerySchedulingDemo from './queryscheduling';

const MainUI = ({ isOnlineQueryRef } ) => {
    const data = usePreloadedQuery(graphql`
            query uiIsOnlineQuery {
                isOnline
            }
        `, isOnlineQueryRef);
    console.log(data);
    return data.isOnline ? 
        <QuerySchedulingDemo /> : "Offline";
}

export default MainUI;