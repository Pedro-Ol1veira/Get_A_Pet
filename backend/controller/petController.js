const Pet = require('../models/Pet');

module.exports = class petController {
    static async create(req, res) {
        res.json({message: "Deu certo"});
    };
}