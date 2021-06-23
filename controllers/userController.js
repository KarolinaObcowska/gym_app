const User = require('../models/user');


exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.id }).select('-passowrd');
        res.json(user)
    } catch (err) {
        console.log(err.msg);
        res.status(500).send('Server Error')
    }
};

exports.deleteAccount = async (req, res) => {
    try {  
        // await Training.deleteMany({ user: req.user.id});
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.log(err.msg);
        res.status(500).send('Server Error')
    }
}

exports.updateAccount = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array()
    //     })
    // };

    const { location, bio, twitter, facebook, instagram } = req.body;
    const accountFields = {};
    accountFields.user = req.user.id;
    if (location) accountFields.location = location;
    if (bio) accountFields.bio = bio;

    accountFields.social = {};
    if (facebook) accountFields.social.facebook = facebook;
    if (twitter) accountFields.social.twitter = twitter;
    if (instagram) accountFields.social.instagram = instagram;

    try {
        let user = await User.findOne({ _id: req.user.id });
        if(user) {
            user = await User.findOneAndUpdate({ _id: req.user.id },
                {$set: accountFields }, { new: true })
            await user.save();
            return res.json(user)
        }
    } catch (err) {
        console.log(err.msg);
        res.status(500).send('Server Error')
    }
}

exports.addGoalCard = async (req, res) => {
    const { actualWeight, goalWeight, height, kcal, trainingRate, steps } = req.body;
    const newGoalCard = {
        actualWeight, 
        goalWeight, 
        height, 
        kcal, 
        trainingRate,
        steps
    };
    try {
        const user = await User.findOne({ _id: req.user.id })
        user.goalCard = newGoalCard;
        await user.save();
        res.json(user)
    } catch (err) {
        console.log(err.msg);
        res.status(500).send('Server Error')
    }
}

exports.deleteGoalCard = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        user.goalCard.splice(0, 1);
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err.msg);
        res.status(500).send('Server Error')
    }
}