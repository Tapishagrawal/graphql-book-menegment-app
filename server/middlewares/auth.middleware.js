const BlackListModel = require("../models/blackList.model");
const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) {
        req.isAuth = false
        return next()
    }
    try {
        const blackListedToken = await BlackListModel.findOne({ token })
        if (blackListedToken) {
            req.isAuth = false
            return next()
        }
        jwt.verify(token, "suersecretkey", (err, decoded) => {
            if (err) {
                req.isAuth = false
                return next()
            } else if (decoded) {
                req.isAuth=true
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ error });
    }
}