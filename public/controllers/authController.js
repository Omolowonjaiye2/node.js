const userDB = {
    users: require('../../Model/user.json'),
    setUser: function (data) { this.user = data }
}

const bycrypt = require('bcrypt');

const handleNewUser = async (req, res) => 
    {
        const { user, pwd } = req.body;
        if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
        
        const foundUser = userDB.users.find(person => person.username === user);
        if (foundUser) return res.sendStatus(401); //unauthorized
        
        const match = await bycrypt.compare(pwd, foundUser.password);
        if (match) {
            res.status(200).json({ 'success': `User ${user} is logged in!` });
        } else {
            res.status(401)
        }

    }

        module.exports = { handleNewUser };
        