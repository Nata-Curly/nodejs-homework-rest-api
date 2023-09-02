const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, 'email is already in use')
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'email or password invalid');
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'email or password invalid');
    };

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    })
};

const getCurrent = async (req, res) => {
    const { name, email } = req.user;

    res.json({
        name, email,
    })
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
        message: 'logout success'
    })
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}
