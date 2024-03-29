const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
})


const login = async (req, res, next) => {
    const { erno, pwd } = req.query;
    const user = await prisma.student.findFirst({
        where: {
            enrollmentNo: { equals: erno },
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

const signUp = (req, res, next) => {

}

module.exports = { login, refresh, signUp }