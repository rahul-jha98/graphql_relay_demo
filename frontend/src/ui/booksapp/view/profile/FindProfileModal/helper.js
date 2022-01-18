// @flow strict-local

import React, { useState, useEffect, useCallback, useRef, useReducer } from 'react';
import { graphql, useRelayEnvironment, fetchQuery } from 'react-relay';

export const UsersQuery = graphql`
    query helperUserSearchQuery(
        $first: Int
        $after: String
        $searchTerm: String
        $authorOnly: Boolean
    ) {
       users(first: $first, after: $after, searchTerm: $searchTerm, authorOnly: $authorOnly) @connection(key: "PaginatedList_users") {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

const initialState = {isLoading: true, data: [], hasNext: false, cachedDataFor: ""};

const useCustomSearchHook = () => {
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialState,
      )
    const subscription = useRef(null);

    const environment = useRelayEnvironment();

    useEffect(() => {
        if (subscription.current) {
            subscription.current.unsubscribe();
        }
        const query = fetchQuery(
            environment,
            UsersQuery,
            {
                first: 3,
                searchTerm: '',
                authorOnly: false,
            },
            {
                fetchPolicy: 'store-or-network',
            }
        );
        subscription.current = query.subscribe({
            start: () => {
                setState({isLoading: true});
            },
            complete: () => {
                setState({isLoading: false});
            },
            error: (err) => {
                console.log(err);
            },
            next: (newResponse) => {
                const { pageInfo, edges } = newResponse.users;
                const { hasNextPage } = pageInfo;

                const fullData = edges;
                console.log({newResponse, edges});
                setState({ data: fullData, hasNext: hasNextPage });
            },
            unsubscribe: () => {
                console.log("Unsubscribe");
            }
            
        });
    }, [environment]);

    const refetch = (searchTerm) => {
        if (subscription.current) {
            subscription.current.unsubscribe();
        }
        if (!state.hasNext) {
            if (searchTerm.startsWith(state.cachedDataFor)) {
                return;
            }
        }
        const query = fetchQuery(
            environment,
            UsersQuery,
            {
                first: 3,
                searchTerm,
                authorOnly: false,
            },
            {
                fetchPolicy: 'store-or-network',
            }
        );
        subscription.current = query.subscribe({
            start: () => {
                setState({isLoading: true});
            },
            complete: () => {
                console.log('Completed');
                setState({ isLoading: false, cachedDataFor: searchTerm });
            },
            error: (err) => {
                console.log(err);
            },
            next: (newResponse) => {
                const { pageInfo, edges } = newResponse.users;
                const { hasNextPage } = pageInfo;

                const fullData = edges;
                console.log({newResponse, edges});
                setState({ data: fullData, hasNext: hasNextPage });
            },
            unsubscribe: () => {
                console.log("Unsubscribe");
            }
        });
    };

    const resetState = useCallback(() => {
        resetState(initialState);
    });
    return { ...state, refetch, resetState };
};

export default useCustomSearchHook;
