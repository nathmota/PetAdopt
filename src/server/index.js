require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
});


async function checkAuthentication(req, next) {
  try {
    if (!req.headers.authorization) throw new Error('Cabeçalho de autorização é necessário');

    const accessToken = req.headers.authorization.trim().split(' ')[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
    next();
  } catch (error) {
    next(error.message);
  }
  next();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/posts', async (req, res, next) => {
    next();
});

app.put('/posts/:id', async (req, res, next) => {
  checkAuthentication(req, next);
});

app.post('/posts', async (req, res, next) => {
  checkAuthentication(req, next)
});

app.delete('/posts/:id', async (req, res, next) => {
  checkAuthentication(req, next);
});

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
});

const Post = database.define('posts', {
  title: Sequelize.STRING, //Feito
  description: Sequelize.TEXT, //Feito
  likesCount: Sequelize.INTEGER,
  petSpecies: Sequelize.INTEGER,
  petName: Sequelize.STRING, //Feito
  petGender: Sequelize.INTEGER,
  petBreed: Sequelize.STRING, //Feito
  petSize: Sequelize.INTEGER,
  place: Sequelize.STRING, //Feito
  contact: Sequelize.STRING, //Feito
  isAdopted: Sequelize.BOOLEAN

});

finale.initialize({ app, sequelize: database });

finale.resource({
  model: Post,
  endpoints: ['/posts', '/posts/:id'],
});

const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
  });
});
