const { Prisma } = require('prisma-binding');

// File connects to remote prisma DB and gives us ability to qery with JS

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

module.exports = db;