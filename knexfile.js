module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/meal'
  },


  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
