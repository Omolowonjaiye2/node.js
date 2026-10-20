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
            const accessToken = jwt.sign(
                { "username": foundUser.username 
                    
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
            const currentUser = { ...foundUser, refreshToken };
            userDB.setUser([...otherUsers, currentUser]);
            await fsPromises.writeFile(
                path.join(__dirname, '..', '..', 'Model', 'user.json'),
                JSON.stringify(userDB.user)
            );
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
            res.status(200).json({ 'success': `User ${user} is logged in!`, 'accessToken': accessToken, 'refreshToken': refreshToken });
        } else {
            res.status(401).json({ 'message': 'Invalid credentials.' });
        }

    }

        module.exports = { handleNewUser };
        