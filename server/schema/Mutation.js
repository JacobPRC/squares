const graphql = require("graphql");

const MainAcc = require("../models/MainAcc");
const Square = require("../models/Square");
const Types = require("./Types");

const { MainAccType, SquareType } = Types;

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    initializeMainAccount: {
      type: MainAccType,
      resolve(parentValue, args) {
        return new MainAcc({}).save();
      },
    },
    addMoneyToMainAccount: {
      type: MainAccType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, amount }) {
        return MainAcc.findById(id).then((acc) => {
          acc.balance += amount;
          return acc.save();
        });
      },
    },
    createSquare: {
      type: SquareType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        goal: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { name, description }) {
        return new Square({ name, description, goal }).save();
      },
    },
    addMoneyToSquare: {
      type: SquareType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, amount }) {
        return Square.findById(id).then((sq) => {
          sq.balance += amount;
          return sq.save();
        });
      },
    },
  },
});

module.exports = mutation;
