const { ObjectId } = require("mongodb");
const Helper = require("../helper/helper");
const { User } = require("../model");

async function authentication(req, res, next) {
        const { access_token } = req.headers;

        const payload = Helper.verifyToken(access_token);
        const user = await User.findById(payload.id);

        if (!user) throw { name: "UNAUTHENTICATED", messsage: "User not found!" };
        req.user = payload;

        next();
}

module.exports = authentication;
