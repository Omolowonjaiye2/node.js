const userDB = {
    users: require('../../Model/user.json'),
    setUsers: function(data) {this.users = data}
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
        return res.sendStatus(204);
    }

    const otherUsers = userDB.users.filter(person => person.refreshToken !== refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..    ', '..', 'Model', 'user.json'),
        JSON.stringify(userDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
    res.sendStatus(204);
}

module.exports = { handleLogout };