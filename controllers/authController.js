const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});


const login = async (req, res, next) => {
    const { erno, pwd } = req.body;

    console.log(erno, pwd);

    if (!erno || !pwd) {
        return res.status(400).json({ message: 'Details incomplete' });
    }

    const user = await prisma.Authentication.findFirst({
        where: {
            username: erno
        }
    });

    if (!user) {
        return res.send({ message: 'User Does Not Exist!' });
    } else if (user.password !== pwd) {
        return res.send({ message: 'Unauthorized!' });
    } else {
        const refreshUser = await prisma.RefreshTokens.findFirst({
            where: {
                username: erno
            }
        });

        if (!refreshUser) {
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '500s' });
            const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' });

            await prisma.RefreshTokens.create({
                data: {
                    username: erno,
                    token: refreshToken
                }
            });

            const tokens = { accessToken: accessToken, refreshToken: refreshToken };

            return res.status(200).json(tokens);
        } else {
            return res.status(200).json({});
        }
    }
}

const refresh = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const userRefreshToken = await prisma.RefreshTokens.findFirst({
        where: {
            token: refreshToken
        }
    });

    if (!userRefreshToken) {
        return res.status(403).json({ message: 'Invalid Refresh token!' });
    }

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
        res.status(400).json({ message: 'Details incomplete' });
    }

    const newUser = await prisma.Authentication.create({
        data: {
            username: username,
            password: password
        }
    });

    if (!newUser) {
        res.status(400).json({ message: 'Some error occurred!' });
    } else {
        const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '500s' });
        const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' });

        await prisma.RefreshTokens.create({
            data: {
                username: username,
                token: refreshToken
            }
        });

        const tokens = { accessToken: accessToken, refreshToken: refreshToken };

        return res.json(tokens);
    }
}

module.exports = { login, refresh, signUp }