const userDB = {
    users: require('../../Model/user.json'),
    setUser: function (data) { this.user = data }
}

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const path = require('path');

router.post('/', async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); //unauthorized

    const isMatch = await bcrypt.compare(pwd, foundUser.password);
    if (!isMatch) return res.sendStatus(401); //unauthorized

    res.json({ 'success': `Welcome ${user}!` });
});

module.exports = router;