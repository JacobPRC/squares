const graphql = require("graphql");

const User = require("../models/User");
const Square = require("../models/Square");
const Types = require("./Types");

const { UserType, SquareType } = Types;

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find({});
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
