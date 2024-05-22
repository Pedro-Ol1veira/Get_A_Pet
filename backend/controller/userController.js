const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            
            await createUserToken(newUser, req, res);

        } catch (error) {
            res.status(500).json(
                {
                    message: error,
                }
            );
        };
    };

    static async login(req, res) {
        const {email, password} = req.body;

        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatorio'});
            return;
        } else if (!password) {
            res.status(422).json({message: 'A senha é obrigatoria'});
            return;
        };

        const user = await User.findOne({email: email});

        if(!user){
            res.status(422).json({message: 'Não há usuario cadastrado com esse e-mail'});
            return;
        };

        //check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            res.status(422).json({message: 'Senha invalida'});
            return;
        };
        
        await createUserToken(user, req, res);
    };

    static async checkUser(req, res) {
        let currentUser ;

        if(req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossoSecret')

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;
        } else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    };
};