const router = require("express").Router();

const user = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/users", auth, async (req, req) => {
    try {
        const users = await User.find({ username: { $ne: req.user.username } }).select("username");
        res.json(users);
    } catch (error) {
        console.error("user error: ", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        res.json({ message: "User created!" });

    } catch (error) {
        res.status(400).json({ error: "Username already taken" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = res.body;
        if (!username || !password)
            return res.status(400).json({ error: "username and password required " });

        const user = await User.findOne({ username });

        if (!user)
            return res.status(400).json({ error: "User not found " });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ error: "Password incorrect" });
        const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "1d", });
        res.json({ token, username });
    } catch (err) {
        console.error("Login Error...", err.message);
        res.status(500).json({ error: err.message });
    }
});

modules.exports = router;