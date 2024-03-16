const BookModel = require("../../models/book.model");
const UserModel = require("../../models/user.model")


module.exports = {
    createBook: async (args, req) => {
        const { isAuth } = req;
        const { author, price, title, release_year } = args.bookInput;
        if (!isAuth || req?.user?.role === "user") {
            throw new Error("Unauthenticated!")
        }
        try {
            const newBook = new BookModel({
                author,
                price,
                title,
                release_year
            });
            const response = await newBook.save()
            return response
        } catch (error) {
            throw error
        }

    },
    updateBook: async ({ bookId, updateBookInput }, req) => {
        const { isAuth } = req;
        if (!isAuth || req?.user?.role === "user") {
            throw new Error("Unauthenticated!")
        }
        try {
            const updatedBook = await BookModel.findByIdAndUpdate(bookId, updateBookInput, { new: true });
            if (!updatedBook) {
                throw new Error('Book not found.');
            }
            return updatedBook;
        } catch (error) {
            throw error;
        }
    },
    cancelBook: async ({ bookId }, req) => {
        const { isAuth } = req;
        if (!isAuth || req?.user?.role === "user") {
            throw new Error("Unauthenticated!")
        }
        try {
            const deletedBook = await BookModel.findByIdAndDelete(bookId);
            if (!deletedBook) {
                throw new Error("Book not found!")
            }
        } catch (error) {
            throw error
        }
        return "Book Deleted successfully!"
    },
    allBooks: async ({ searchTerm }, req) => {
        const { isAuth } = req;
        if (!isAuth) {
            throw new Error("Unauthenticated!")
        }
        try {
            let query = {}
            if (searchTerm) {
                query.$or = [
                    { author: { $regex: searchTerm, $options: 'i' } },
                    { title: { $regex: searchTerm, $options: 'i' } }
                ]
            }
            const allBook = await BookModel.find(query);
            return allBook
        } catch (error) {
            throw new Error(error)
        }
    },
    borrowBooks: async ({ bookId }, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!")
        }
        try {
            const book = await BookModel.findOne({ _id: bookId });
            if (!book) {
                throw new Error("Book not found")
            }
            if (book.bookBorrowedBy) {
                return "The book has been rented out."
            }
            const bookupdatedFiled = {
                bookBorrowedBy: req.user.userId
            }
            await BookModel.findByIdAndUpdate(bookId, bookupdatedFiled);
            const user = await UserModel.findOne({ _id: req.user.userId });
            user.borrowedBooks.push(bookId);
            await user.save()
            return "Book borrowed successfully."
        } catch (error) {

        }
    },
    contactForBook:async({bookId}, req)=>{
        if (!req.isAuth) {
            throw new Error("Unauthenticated!")
        }
        try {
            const lentBook = await BookModel.findOne({_id:bookId}).populate("bookBorrowedBy");

            if (!lentBook) {
                throw new Error("Book not found")
            }

            const bookOwner = await UserModel.findOne({_id:lentBook.bookBorrowedBy._id});
            if (!bookOwner) {
                throw new Error("Book not found")
            }
            const isExist = bookOwner.notification.some(notification=>notification.bookId.equals(bookId))
            if(isExist){
                return "A notification already sent for this Book."
            }
            if(lentBook.bookBorrowedBy._id.toString()===req.user.userId.toString()){
                throw new Error("appropriate action")
            }
            bookOwner.notification.push({bookId, renterId:req.user.userId});
            await bookOwner.save()
            return "Notification sent for book borrowing"
        } catch (error) {
            throw new Error(error)
        }
    }
}