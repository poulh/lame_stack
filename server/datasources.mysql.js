// The user account will require 'mysql_native_password'
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '
// I left this file here as an example, but the tables are not auto-generated and I haven't had time to dig into
// this more. Mongo only works at the moment.

module.exports = {
  "db": {
    "name": "db",
    "connector": "mysql",
    "host": process.env.DB_HOST || 'localhost',
    "port": process.DB_PORT || 3306,
    "url": "",
    "database": process.env.DB_NAME,
    "password": process.env.DB_PASSWORD,
    "user": process.env.DB_USER
  }
}
