# IdeaClan Book Management App with GraphQL

Welcome to the IdeaClan Book Management App with GraphQL project. This project aims to provide a comprehensive solution for managing books, users, and borrowing requests efficiently using GraphQL. Below you will find detailed information on features, installation, usage, and technology stack utilized in this project.

## Features

- **User Authentication**: Users can register, login, and logout with different roles (user, admin).
- **Admin Privileges**: Only admins can create, delete, or update books.
- **Book Management**: Users can browse all books, search for specific books, borrow books, and request books from other users.
- **Notification System**: Users receive notifications when any user requests to borrow books.

## Technology Stack

- **bcrypt**: Library for hashing passwords.
- **express**: Web application framework for Node.js.
- **express-graphql**: Middleware for serving GraphQL APIs.
- **graphql**: Query language for APIs.
- **jsonwebtoken**: Library for generating JSON Web Tokens.
- **mongoose**: MongoDB object modeling tool.
- **nodemon**: Utility for automatically restarting the server during development.

## Installation

To install all dependencies, run the following command:

`npm install`

## Running the Server

To run the server, execute the following command:

`npm run start`

<hr/>

## Usage

<table>
  <tr>
    <th>Route</th>
    <th>Method</th>
    <th>Body</th>
    <th>Query</th>
    <th>Result</th>
  </tr>
  <tr>
    <td>Register New User</td>
    <td>POST</td>
    <td>
      <pre>
{
  "query": "mutation { createUser(userInput: { email: &quot;example@gmail.com&quot;, password: &quot;****&quot;, role: &quot;user&quot; }) { _id email role }}"
}
      </pre>
    </td>
    <td>createUser(userInput:UserInput):User</td>
    <td>
      <pre>
type User {
        _id:ID!
        email:String!
        password:String
        role:String!
        borrowedBooks:[Book!]
    }
      </pre>
    </td>
  </tr>
  <tr>
    <td>Login</td>
    <td>GET</td>
    <td>
      <pre>
{
  "query": "query { login(email: &quot;user@gmail.com&quot;, password: &quot;123&quot;) { token }}"
}
      </pre>
    </td>
    <td>login(email:String!, password:String!):AuthData!</td>
    <td>
      <pre>
type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
      }
      </pre>
    </td>
  </tr>
  <tr>
    <td>Logout</td>
    <td>GET</td>
    <td>
      <pre>
{
  "query": "query { logout }"
}
      </pre>
    </td>
    <td>logout:String!</td>
    <td>
      <pre>
{
  "type": "String",
  "message": "Successfully logged out"
}
      </pre>
    </td>
  </tr>
  <tr>
    <td>Fetch All Books</td>
    <td>GET</td>
    <td>
      <pre>
{
  "query": "query { allBooks { _id author price title release_year }}"
}
      </pre>
    </td>
    <td>allBooks(searchTerm: String):[Book!]!</td>
    <td>
      <pre>
type Book {
        _id:ID!
        author:String!
        price:Float!
        title:String!
        release_year:Int!
        bookBorrowedBy:User!
    }
      </pre>
    </td>
  </tr>
  <tr>
    <td>Search Books</td>
    <td>GET</td>
    <td>
      <pre>
{
  "query": "query { allBooks(searchTerm: &quot;search query&quot;) { _id author title }}"
}
      </pre>
    </td>
    <td>allBooks(searchTerm: String):[Book!]!</td>
    <td>
      <pre>
type Book {
        _id:ID!
        author:String!
        price:Float!
        title:String!
        release_year:Int!
        bookBorrowedBy:User!
    }
      </pre>
    </td>
  </tr>
  <tr>
    <td>Borrow Book</td>
    <td>POST</td>
    <td>
      <pre>
{
  "query": "mutation { borrowBooks(bookId: &quot;65f5e73af5ecf60ed2e28ed2&quot;) }"
}
      </pre>
    </td>
    <td>        borrowBooks(bookId:String):String!
</td>
    <td>
      <pre>
{
  "type": "String",
  "message": "Book successfully borrowed"
}
      </pre>
    </td>
  </tr>
  <tr>
    <td>Contact for Book</td>
    <td>POST</td>
    <td>
      <pre>
{
  "query": "mutation { contactForBook(bookId: &quot;65f68e9e216de737df19ed6d&quot;) }"
}
      </pre>
    </td>
    <td>        contactForBook(bookId:ID!):String!
</td>
    <td>
      <pre>
{
  "type": "String",
  "message": "Contact request sent successfully"
}
      </pre>
    </td>
  </tr>
  <tr>
    <td>Approve Book Borrow Request</td>
    <td>POST</td>
    <td>
      <pre>
{
  "query": "mutation { approveBookBorrowRequest(notificationID: &quot;65f69357216de737df19ed97&quot;) }"
}
      </pre>
    </td>
    <td>approveBookBorrowRequest(notificationID:ID!):String!
</td>
    <td>
      <pre>
{
  "type": "String",
  "message": "Borrow request approved successfully"
}
      </pre>
    </td>
  </tr>
</table>

## Deployed Link

You can access the deployed application [here](https://graphql-book-menegment-app.onrender.com/graphql).

## Postman Collection

For more detailed API documentation and testing, please refer to the [Postman Collection](https://speeding-trinity-718409.postman.co/workspace/New-Team-Workspace~fbcd3a3b-c6f6-4d19-b458-99ac3e176cae/collection/28670083-14468798-b67f-47d8-bd10-61ced65cdaee?action=share&creator=28670083).

Thank you for using IdeaClan Book Management App with GraphQL! If you have any questions or feedback, please feel free to reach out.
