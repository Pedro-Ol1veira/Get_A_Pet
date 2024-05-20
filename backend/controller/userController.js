const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = class userController {
    static async register(req, res) {
        const {name, email, phone, password, confirmPassword} = req.body;

        //validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatorio'});
            return;
        } else if (!email) {
            res.status(422).json({message: 'O e-mail é obrigatorio'});
            return;
        } else if (!phone) {
            res.status(422).json({message: 'O telefone é obrigatorio'});
            return;
        } else if (!password) {
            res.status(422).json({message: 'A senha é obrigatoria'});
            return;
        } else if (!confirmPassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatoria'});
            return;
        };
        if(password !== confirmPassword) {
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais'});
            return;
        };

        //check if user exists
        const userExists = await User.findOne({email: email});

        if(userExists){
            res.status(422).json({message: 'E-mail já cadastrado!'});
            return;
        };

        //create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        });
        
        try {
            const newUser = await user.save();
            res.status(201).json({message: 'Usuario criado'});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };
};