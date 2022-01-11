const { Environment, Network, RecordSource, Store } = require('relay-runtime')

const store = new Store(new RecordSource())

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'http://localhost:8080';
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

const environment = new Environment({
  network,
  store,
});

export default environment;