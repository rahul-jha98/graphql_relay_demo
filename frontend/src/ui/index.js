import { graphql, usePreloadedQuery } from "react-relay";

const MainUI = ({ isOnlineQueryRef } ) => {
    const data = usePreloadedQuery(graphql`
            query uiIsOnlineQuery {
                isOnline
            }
        `, isOnlineQueryRef);

    return data.isOnline ? "Online" : "Offline";
}

export default MainUI;