const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User Already Exists" });
        }

        const user = new User({ email, username, password:hashpassword })
        await user.save();
        return res.status(201).json({ message: "User Registered Successfully", user });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" });
    }
});

//LOGIIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(200).json({ message: "Please signup first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect){
            return res.status(200).json({ message: "Password is not correct" });
        }
        
        const { password, ...others } = user._doc;
        return res.status(200).json({ others });

    } catch (error) {
        console.error(error)
        return res.status(200).json({ message: "Server error" });
    }
});

module.exports = router;
