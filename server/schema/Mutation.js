const graphql = require("graphql");

const User = require("../models/User");
const Square = require("../models/Square");
const Types = require("./Types");

const { UserType, SquareType } = Types;

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const removeIdFromNestedArr = (id, arr) => {
  const idToRemove = arr.indexOf(id);
  if (idToRemove >= 0) {
    return arr.splice(idToRemove, 1);
  }
};

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { name, age }) {
        return new User({ name, age }).save();
      },
    },
    addMoneyToUsersAcc: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, amount }) {
        return User.findById(id).then((acc) => {
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { name, description, goal, userId }) {
        return new Square({ name, description, goal }).save().then((sq) => {
          return User.findByIdAndUpdate(
            userId,
            { $push: { squares: sq._id } },
            { new: true, useFindAndModify: false }
          );
        });
      },
    },
    editSquare: {
      type: SquareType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        goal: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, name, description, goal }) {
        return Square.findByIdAndUpdate(id, { name, description, goal });
      },
    },
    deleteSquare: {
      type: SquareType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id, userId }) {
        return User.findById(userId)
          .then((user) => {
            removeIdFromNestedArr(id, user.squares);
            return user.save();
          })
          .then(() => Square.findByIdAndDelete(id));
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
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, name, age }) {
        return User.findByIdAndUpdate(id, { name, age });
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findByIdAndDelete(id);
      },
    },
    subtractMoneyFromSquare: {
      type: SquareType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, { id, amount }) {
        return Square.findById(id).then((sq) => {
          sq.balance -= amount;
          sq.save();
        });
      },
    },
  },
});

module.exports = mutation;
