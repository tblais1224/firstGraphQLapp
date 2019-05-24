const express = require("express");
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")

const app = express();

//graphql middleware to handle gql reqs
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));
