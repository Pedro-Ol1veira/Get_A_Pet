const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const checkPetOwner = require('../helpers/check-pet-owner');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class petController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body;
        const images = req.files;

        const available = true;

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatorio" });
            return;
        };

        if (!age) {
            res.status(422).json({ message: "A idade é obrigatoria" });
            return;
        };

        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatorio" });
            return;
        };

        if (!color) {
            res.status(422).json({ message: "A cor é obrigatoria" });
            return;
        };

        if (images.length === 0) {
            res.status(422).json({ message: "A foto é obrigatoria" });
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
            res.status(500).json({ message: error });
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

        const pets = await Pet.find({ 'user.id': user._id }).sort('-createdAt');

        res.status(200).json({
            pets,
        });
    };

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ 'adopter._id': user.id }).sort('-createdAt');

        res.status(200).json({
            pets,
        });
    };

    static async getPetById(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" });
            return;
        };

        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" });
            return;
        };

        res.status(200).json({
            pet,
        });
    };

    static async removePetById(req, res) {
        const id = req.params.id;

        const pet = await checkPetOwner(req, res, id);

        if (!pet) {
            return;
        };

        await Pet.findByIdAndDelete(id);

        res.status(200).json({
            message: "Pet removido com sucesso"
        });


    };

    static async updatePet(req, res) {
        const { name, age, weight, color, available } = req.body;
        const images = req.files;
        const id = req.params.id;

        const updatedData = {};

        const pet = await checkPetOwner(req, res, id);

        if (!pet) {
            return;
        };

        //validations 

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatorio" });
            return;
        } else {
            updatedData.name = name;
        };

        if (!age) {
            res.status(422).json({ message: "A idade é obrigatoria" });
            return;
        } else {
            updatedData.age = age;
        };

        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatorio" });
            return;
        } else {
            updatedData.weight = weight;
        };

        if (!color) {
            res.status(422).json({ message: "A cor é obrigatoria" });
            return;
        } else {
            updatedData.color = color;
        };

        if (images.length > 0) {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename);
            });
        };

        await Pet.findByIdAndUpdate(id, updatedData);

        res.status(200).json({
            message: "Pet atualizado com sucesso!"
        });
    };

    static async schedule(req, res) {
        const id = req.params.id;

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

        if (pet.user.id.toString() === user.id) {
            res.status(422).json({ message: "Você não pode agendar uma visita para seu proprio pet" });
            return;
        };

        if (pet.adopter) {
            if (pet.adopter._id === user.id) {
                res.status(422).json({ message: "Você já agendou uma visita para este pet" });
                return;
            }
        };


        pet.adopter = {
            _id: user.id,
            name: user.name,
            image: user.image
        };

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({
            message: `A visita foi agendada com sucesso com ${pet.user.name} pelo telefone ${pet.user.phone}`,
        })
    };

    static async concludeAdoption(req, res) {
        const id = req.params.id;
        const pet = await checkPetOwner(req, res, id);

        if (!pet.adopter) {
            res.status(422).json({
                message: "O seu pet ainda não foi selecionado por outro usuário"
            });
            return;
        };


        pet.available = false;

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({
            message: "Parabéns seu pet foi adotado"
        });
    };
};