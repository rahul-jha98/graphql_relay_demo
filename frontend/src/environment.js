import {Environment, Network, RecordSource, Store, ROOT_TYPE } from 'relay-runtime';
import {  ConnectionHandler } from "react-relay";
const store = new Store(new RecordSource())

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_BASE_URL : 'http://localhost:8080';
const GRAPHLQL_ENDPOINT = `${BASE_URL}/graphql`;

const network = Network.create((operation, variables) => {
  return fetch(GRAPHLQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
});

const missingFieldHandlers = [
  {
    handle(field, record, argValues) {

      if (
        record != null &&
        record.__typename === ROOT_TYPE &&
        field.name === 'node' &&
        argValues.hasOwnProperty('id')
      ) {
        return argValues.id;
      }
      if (
        record != null &&
        record.__typename === ROOT_TYPE &&
        field.name === 'comments' &&
        argValues.hasOwnProperty('book_id') &&
        !argValues.hasOwnProperty('user_id')
      ) {
        const requestedBookId = argValues.book_id;
  
        const connectionId = ConnectionHandler.getConnectionID(requestedBookId, "PaginatedListCommentsForBook_comments");
        return connectionId;
      }
      return undefined;
    },
    kind: 'linked',
  },
];

const environment = new Environment({
  network,
  store,
  missingFieldHandlers
});

export default environment;