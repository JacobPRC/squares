const graphql = require("graphql");
const { populate } = require("../models/User");
const User = require("../models/User");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    balance: { type: GraphQLInt },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    squares: {
      type: new GraphQLList(SquareType),
      resolve(parentValue, args) {
        return User.findById(parentValue.id)
          .populate("squares")
          .then((user) => user.squares);
      },
    },
  }),
});

const SquareType = new GraphQLObjectType({
  name: "square",
  fields: () => ({
    balance: { type: GraphQLInt },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    goal: { type: GraphQLInt },
  }),
});

module.exports = { UserType, SquareType };
