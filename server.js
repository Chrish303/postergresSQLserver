// server.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDef');
const resolvers = require('./resolver');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
});
