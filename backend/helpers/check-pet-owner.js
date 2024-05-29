const Pet = require('../models/Pet');
const ObjectId = require('mongoose').Types.ObjectId;
const getToken = require('./get-token');
const getUserByToken = require('./get-user-by-token');



const checkPetOwner = async (req, res, id) => {
    if (!ObjectId.isValid(id)) {
        res.status(422).json({ message: "Id inválido" });
        return;
    };

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
        res.status(404).json({ message: "Pet não encontrado" });
        return;
    };


    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user.id.toString() !== user.id) {
        res.status(422).json({ message: "Este pet não e seu" });
        return;
    };

    return pet;
};

module.exports = checkPetOwner;












