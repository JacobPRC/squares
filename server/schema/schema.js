const graphql = require("graphql");

const MainAcc = require("../models/MainAcc");
const Square = require("../models/Square");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

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
      },
      resolve(parentValue, { name, description }) {
        return new Square({ name, description }).save();
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

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
