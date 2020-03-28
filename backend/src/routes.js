const express = require('express');

const OngController = require('./controllers/OngController');//importando o controller de criar ongs
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //desacoplando o módulo de rotas do express em uma nova variável

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);//chamando o método index de dentro do controller de ongs, para listar
routes.post('/ongs', OngController.create);//chamando o método create de dentro do controller de ongs, para criar

routes.get('/profile', ProfileController.index);//chamando o método index de dentro do controller de profile, para listar os incidentes especificos de uma ong

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);//método para deletar um incidente usando um id

module.exports = routes;
