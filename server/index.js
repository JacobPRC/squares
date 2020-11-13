const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const schema = require("./schema/schema");

const app = express();

//So make basic app. Then maybe add ability to add card or bank acc
// and give option to fill w random numbers bc this is a pretend app

mongoose.connect(
  keys.mongoURI,
  { useFindAndModify: false },
  { useNewUrlParser: true }
);

require("./models/User");
require("./models/Square");

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("listening on 4000"));
