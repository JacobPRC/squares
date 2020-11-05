const graphql = require("graphql");

const RootQuery = require("./RootQuery");
const mutation = require("./Mutation");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
