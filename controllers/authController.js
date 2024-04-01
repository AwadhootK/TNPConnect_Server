const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
})


const login = async (req, res, next) => {
    const { erno, pwd } = req.body;

    console.log(erno, pwd);

    if (!erno || !pwd) {
        res.status(400).send('Details incomplete');
    }

    const user = await prisma.Authentication.findFirst({
        where: {
            username: erno
        }
    });

    if (!user) {
        return res.send('<h1>User Does Not Exist!</h1>');
    } else if (user.password !== pwd) {
        return res.send('<h1>Unauthorized!</h1>');
    } else {
        // authorized
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '500s' });
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' });

        // refreshTokens.push(refreshToken);

        const tokens = { accessToken: accessToken, refreshToken: refreshToken };

        return res.json(tokens);
    }

}

const refresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    //! check DB for refreshtoken availability
    // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' }, (err, user) => {
        if (err) return res.sendStatus(403)
        const newAccessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '20s' })
        return res.json({ accessToken: newAccessToken })
    });
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
        res.status(400).send('Details incomplete');
    }

    const newUser = await prisma.Authentication.create({
        data: {
            username: username,
            password: password
        }
    });

    if (!newUser) {
        res.status(400).send('Some error occurred!');
    } else {
        res.send(newUser);
    }
}

module.exports = { login, refresh, signUp }