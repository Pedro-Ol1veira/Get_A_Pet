const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class petController {
    static async create(req, res) {
        const {name, age, weight, color} = req.body;
        const images = req.files;

        const available = true;

        if(!name) {
            res.status(422).json({message: "O nome é obrigatorio"});
            return;
        };

        if(!age) {
            res.status(422).json({message: "A idade é obrigatoria"});
            return;
        };

        if(!weight) {
            res.status(422).json({message: "O peso é obrigatorio"});
            return;
        };

        if(!color) {
            res.status(422).json({message: "A cor é obrigatoria"});
            return;
        };

        if(images.length === 0) {
            res.status(422).json({message: "A foto é obrigatoria"});
            return;
        };

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        });

        images.map((image) => {
            pet.images.push(image.filename)
        });

        try {
            const newPet = await pet.save();
            res.status(201).json({
                message: "Pet cadastrado com sucesso",
                newPet,
            })
        } catch (error) {
            res.status(500).json({message: error});
        };
    };

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt');
        res.status(200).json({
            pets: pets,
        });
    };

    static async getAllUserPets(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'user.id': user._id}).sort('-createdAt');

        res.status(200).json({
            pets,
        });
    };

    static async getAllUserAdoptions(req,res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'adopter.id': user._id}).sort('-createdAt');

        res.status(200).json({
            pets,
        });
    };
};