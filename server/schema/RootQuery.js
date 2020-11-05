const graphql = require("graphql");

const MainAcc = require("../models/MainAcc");
const Square = require("../models/Square");
const Types = require("./Types");

const { MainAccType, SquareType } = Types;

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    mainAcc: {
      type: MainAccType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return MainAcc.findById(id);
      },
    },
    squares: {
      type: new GraphQLList(SquareType),
      resolve(parentValue, args) {
        return Square.find({});
      },
    },
    square: {
      type: SquareType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Square.findById(id);
      },
    },
  },
});

module.exports = RootQuery;
