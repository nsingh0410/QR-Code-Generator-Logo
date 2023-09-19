require('dotenv').config();

const config_skyonair = {
    user: process.env.DBUSER,
    database: process.env.DBDATABASESKYONAIR,
    password: process.env.DBPASSWORD,
    server: process.env.DBSERVER,
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: process.env.DBINSTANCENAME
    },
    port: parseInt(process.env.DBPORT, 10)
}

module.exports = config_skyonair;
