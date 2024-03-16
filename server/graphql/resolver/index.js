const bookResolver = require("./book");
const authResolver = require("./userAuth");

module.exports={
    ...authResolver,
    ...bookResolver
}