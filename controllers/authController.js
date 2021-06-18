const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
        errors: errors.array()
        })
    };
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({ 
            errors: [{ 
                msg: 'User already exists! Please use SignIn' 
            }] 
        })
    };
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
        const result = await user.save();
        const token = jwt.sign(
            {
                user: {
                    email: user.email,
                    id: user.id
                }
            }, 
            config.get('jwtToken'),
            { expiresIn: '1h' }
        );
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.msg)
        res.status(500).send('Server error')
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).json({ 
                errors: [{ 
                    msg: 'User does not exist! Please use SignUp' 
                }] 
            })
        };
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] })
        }
        const token = jwt.sign(
            {
                user: {
                    id: user.id
                }
            },
            config.get('jwtToken'),
            {
                expiresIn: '10h'
            }
        );
        res.status(200).json({token, user});
    } catch (err) {
        console.error(err.msg)
        res.status(500).send('Server error')
    }
}