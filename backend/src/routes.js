const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //para efetuar a validação

const OngController = require('./controllers/OngController');//importando o controller de criar ongs
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //desacoplando o módulo de rotas do express em uma nova variável

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({//validando os campos do objeto do body de cadastro de ong
    id: Joi.number().required(), //validando se o id foi informado no logon
  })
}), SessionController.create);

routes.get('/ongs', OngController.index);//chamando o método index de dentro do controller de ongs, para listar

routes.post('/ongs', celebrate({ //chamando a biblioteca celebrate para validar os dados
  [Segments.BODY]: Joi.object().keys({//validando os campos do objeto do body de cadastro de ong
    name: Joi.string().required(),
    email: Joi.string().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);//chamando o método create de dentro do controller de ongs, para criar

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({ //validando se o id da ong foi passado ao header
    authorization: Joi.string().required(),
  }).unknown(),
  }), ProfileController.index);//chamando o método index de dentro do controller de profile, para listar os incidentes especificos de uma ong

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(), //validando o número de paginação
  })
}), IncidentsController.index);//para paginação

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({ //validando se o id da ong foi passado ao header
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({//validando os campos do objeto do body de cadastro de incidente
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  })
}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),//validando se o id está sendo passado para fazer o delete
  })
}), IncidentsController.delete);//método para deletar um incidente usando um id

module.exports = routes;
