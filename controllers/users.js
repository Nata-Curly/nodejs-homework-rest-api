const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(_id, req.body, { subscription });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({message: `Subscription updated to ${subscription}`});
};

module.exports = {
    updateSubscription: ctrlWrapper(updateSubscription),
};
