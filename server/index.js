const express                   = require('express');
const cors                      = require('cors');

const { graphqlHTTP }           = require('express-graphql');
const {importSchema}            = require('graphql-import');
const { makeExecutableSchema }  = require("@graphql-tools/schema");
const resolvers                 = require('./resolvers');
const getDataLoaders            = require('./resolvers/dataloader');

const typeDefs = importSchema('graphql/schema.graphql');
const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
        return ({ message: err.message, statusCode: 500 });
    },
    context: {
        dataLoaders: getDataLoaders()
    },
}));

app.listen(8085, () => {
    console.log("Started server on port 8080");
});