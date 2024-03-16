const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserModel = require("../../models/user.model");
const BlackListModel = require("../../models/blackList.model");


module.exports = {
    createUser: async (args) => {
        const { email, password, role } = args.userInput;
        try {
            if (!email || !password) {
                throw new Error("Email and password are required.");
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error("User exists already.");
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                email,
                role,
                password: hashPassword
            });

            const response = await newUser.save();

            return { ...response._doc, password: null };
        } catch (error) {
            throw error;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("User does not exist!")
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign({ userId: user.id, email: user.email, role:user.role }, "suersecretkey", { expiresIn: "1h" });
            return { userId: user.id, token, tokenExpiration: 1 }

        } catch (error) {
            throw error
        }
    },
    logout:async(_,req)=>{
        const token = req.headers.authorization?.split(" ")[1];
        try {
            const newToken = new BlackListModel({token});
            await newToken.save();
            return "logout successfully!"
        } catch (error) {
            throw error
        }
    }
};