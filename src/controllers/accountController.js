import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
const {readFile, writeFile} = fs;

const routes = express.Router();

routes.post('/', async (request, response) => {
    try {
        let account = request.body;

        const pathFile = path.resolve('accounts.json' );

        const data = JSON.parse(await readFile(pathFile));
        
        account = {id: data.nextId++, ...account};

        data.accounts.push(account);

        await writeFile(pathFile, JSON.stringify(data, null, 2));
        
        response.send(account);
    } catch (err) {
        response.status(400).send({ error: err.message})        
    }
});
export default routes;