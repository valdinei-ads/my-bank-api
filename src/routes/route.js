import express from 'express';
import accountController from '../controllers/accountController.js'

const routes = express.Router();

routes.use('/accounts', accountController);

routes.get('/', (request, response) => {
    return response.json({message: 'Hello World!!'});
});
export default routes;