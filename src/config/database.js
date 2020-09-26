const path = require('path')

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? path.resolve(__dirname,'../../.env.testing') : path.resolve(__dirname,'../../.env')
})

module.exports = {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
    // dialect: "mysql",
    // define: {
    //     timestamps: true,
    //     underscored: true 
    // }

    username: 'empreendedoris01',
    password: 'kGGnN95q99Sh',
    database: 'empreendedoris01',
    host: 'mysql.empreendedorismoufpi.com.br',
    dialect: "mysql",
    define: {
        timestamps: true,
        underscored: true 
    }
}

