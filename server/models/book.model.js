const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = Schema({
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    release_year: {
        type: String,
        required: true
    },
    bookBorrowedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        default:null
    }
}, {
    versionKey: false
})

module.exports = mongoose.model("book", bookSchema)