const User = require('../models/user-model')

loginUser = async (req, res) => {
    
    await User.findOne({ email: req.params.email }, async (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        await User.findOne({ email: req.params.email, password: req.params.password }, (err, user) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `Password wrong` })
            }
            return res.status(200).json({ success: true, data: user })
        
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

getUsers = async (req, res) => {
    if(req.params.id){
        await User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }
            return res.status(200).json({ success: true, data: user })
        
        }).catch(err => console.log(err))
    }else{
        await User.find({}, (err, users) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!users.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }
            return res.status(200).json({ success: true, data: users })
        }).catch(err => console.log(err))
    }
}

module.exports = {
    loginUser,
    createUser,
    getUsers
}