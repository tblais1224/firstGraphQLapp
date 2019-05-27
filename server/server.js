const express = require("express");
const mongoose = require("mongoose")
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")
const mongoURI = require("./config/keys").mongoURI
const cors = require("cors")

const app = express();

// allow cross origin reqs
app.use(cors())

//connect to mongo atlas
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected")
})

//graphql middleware to handle gql reqs
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));
