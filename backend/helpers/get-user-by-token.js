const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (token) => {

    if(!token) {
        return res.status(401).json({ message: "Acesso negado"});
    };

    const decoded = jwt.verify(token, "nossoSecret");

    const userId = decoded.id;

    const user = await User.findById(userId);
    user.password = undefined;
    return user;
};

module.exports = getUserByToken;