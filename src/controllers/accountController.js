import express, { request, response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const {readFile, writeFile} = fs;

const routes = express.Router();

routes.post('/', async (request, response) => {
    try {
        let account = request.body;

        const filePath = path.resolve('accounts.json' );

        const data = JSON.parse(await readFile(filePath));
        
        account = {id: data.nextId++, ...account};

        data.accounts.push(account);

        await writeFile(filePath, JSON.stringify(data, null, 2));
        
        response.send(account);
    } catch (err) {
        response.status(400).send({ error: err.message})        
    }
});

routes.get('/', async (request, response) => {
    try {
        
        const filePath = path.resolve('accounts.json' );
        
        const data = JSON.parse(await readFile(filePath));

        response.send(data);
        
    } catch (err) {
        response.status(400).send({ error: err.message})        
    }
});

routes.get('/:id', async (request, response) => {
    try {

        let id = request.params.id;
        
        const filePath = path.resolve('accounts.json' );
        
        const data = JSON.parse(await readFile(filePath));
        
        let filtered = data.accounts.filter(x => x.id == id);
        
        response.send(filtered);
        
    } catch (err) {
        response.status(400).send({ error: err.message})        
    }
});
export default routes;