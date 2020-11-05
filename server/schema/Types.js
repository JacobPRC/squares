const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const MainAccType = new GraphQLObjectType({
  name: "mainAccount",
  fields: () => ({
    balance: { type: GraphQLInt },
    id: { type: GraphQLID },
  }),
});

const SquareType = new GraphQLObjectType({
  name: "square",
  fields: () => ({
    balance: { type: GraphQLInt },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

module.exports = { MainAccType, SquareType };
