module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/meal'
  },


  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
