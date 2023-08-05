const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'djzifhgu4',
    api_key: '797676925462281',
    api_secret: 'DFsq5RtsBk-fgNNiY7u61qZ5POE'
});

//to convert password to hashed password
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error)
    }
}

//register user
const registerUser = async (req, res) => {
    try {
        const file = req.files.profilepic;
        await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            const newpass = await securePassword(req.body.password);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: newpass,
                profilepic: result.url,
            });
            const userData = await User.findOne({ email: req.body.email });

            if (userData) {
                res.status(400).send({ success: false, msg: "User already exist" });
            }
            else {
                await user.save().then((data) => {
                    res.status(200).send({ success: true, msg: data })
                }).catch((e) => {
                    res.status(500).send({ success: false, msg: e.message })
                });
            }
        })
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
        console.log(error)
    }
}

//login user
const loginUser = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const userData = await User.findOne({ email: user.email });
        if (!userData) {
            res.status(400).send({ success: false, msg: "Incorrect username or password!" });
        }
        else {
            const isValidPass = await bcrypt.compare(user.password, userData.password);
            if (!isValidPass) {
                res.status(400).send({ success: false, msg: "Incorrect username or password!" });
            }
            else {
                res.status(200).send({ success: true, msg: "Login successfuly!", userData });
            }
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
        console.log(error)
    }
}

//get all users
const getUsers = async (req, res) => {
    try {
        await User.find({ _id: { $ne: req.params.id } }).select([
            "name",
            "email",
            "profilepic",
            "_id"
        ]).then((data) => {
            if (!data) {
                res.status(400).send({ success: false, msg: error.message })
            }
            res.status(200).send({ success: true, data })
        }).catch((e) => {
            res.status(400).send({ success: false, msg: e.message })
            console.log(e)
        });

    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
        console.log(error)
    }
}

//get user by id
const getUser = async (req, res) => {
    // console.log(req.body._id);
    try {
        await User.find({
            _id: req.body._id
        }).then((data) => {
            console.log(data);
            res.status(200).send({ success: true, msg: "user found!", data: data })
        }).catch((e) => {
            console.log(e.message);
            res.status(400).send({ success: false, msg: "user not found!", error: e.message })
        });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
        console.log(error)
    }
}
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser
}