import express from 'express';
import routes from './routes/route.js';
import {promises as fs} from 'fs';

const {readFile, writeFile} = fs

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, async () => {
    try {
        await readFile('accounts.json').then(() => {
            console.log('API Started!!!');
        });
    } catch (error) {
        
        const initialJson = { nextId: 1, accounts: [] }

        await writeFile('accounts.json', JSON.stringify(initialJson)).then(() => {
            console.log('API started and File Created!!!');
        }).catch(error => {
            console.log(error);
        });

    }
});