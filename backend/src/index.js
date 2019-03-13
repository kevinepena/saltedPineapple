const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const jwt = require('jsonwebtoken');
const db = require('./db');

const server = createServer();

//TODO Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// decode JWT
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put the userID onto the req for future request to access
        req.userId = userId;
    }
    next();
});

server.express.use(async (req, res, next) => {
    if (!req.userId) return next();
    const user = await db.query.user({ where: { id: req.userId } }, '{ id, permissions, email, name }');

    req.user = user;
    next();
})

// middleware that po

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL,
        },
    },
    deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);
    }
);