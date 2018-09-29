module.exports = {
    "db": {
        "name": "db",
        "connector": "mongodb",
        "host": process.env.DB_HOST || 'localhost',
        "port": process.DB_PORT || 27017,
        "url": "",
        "database": process.env.DB_NAME,
        "password": process.env.DB_PASSWORD,
        "user": process.env.DB_USER
    }
}
