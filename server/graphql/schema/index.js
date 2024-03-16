const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id:ID!
        email:String!
        password:String
        role:String!
        borrowedBooks:[Book!]
    }
    input UserInput {
        email:String!
        password:String!
        role:String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
      }

    type Book {
        _id:ID!
        author:String!
        price:Float!
        title:String!
        release_year:Int!
        bookBorrowedBy:User!
    }

    input BookInput{
        author:String!
        price:Float!
        title:String!
        release_year:Int!
    }

    input SearchBook{
        title:String
        author:String
    }

    input UpdateBookInput{
        author:String
        price:Float
        title:String
        release_year:Int
    }
    
    type RootQuery{
        allusers:[User!]!
        allbooks:[Book!]!
        login(email:String!, password:String!):AuthData!
        logout:String!
        allBooks(searchTerm: String):[Book!]!
        borrowBooks(bookId:String):String!
        contactForBook(bookId:ID!):String!
    }
    
    type RootMutation{
        createUser(userInput:UserInput):User
        createBook(bookInput:BookInput):Book
        updateBook(bookId: ID!, updateBookInput: UpdateBookInput): Book
        cancelBook(bookId:ID!):String
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)