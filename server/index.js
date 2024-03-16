const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connection = require("./connection");
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolver/index");
const auth = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(auth)

app.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue:graphQlResolvers,
    graphiql: true
}))

app.listen(4500, async() => {
    try {
        await connection;
        console.log("http://localhost:4500")
    } catch (error) {
        throw new Error(error)
    }
})