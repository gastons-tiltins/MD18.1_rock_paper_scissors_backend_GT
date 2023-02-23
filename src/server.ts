import express from 'express';
import {Request, Response} from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

app.listen(3004, () => {
    console.log('Application started on port 3004!');
});

// CONNECT TO MYSQL SERVER
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'rps1',
});

// READ ALL RESULTS
app.get('/results', (req: Request, res: Response) => {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query('SELECT * FROM games', function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
});

// POST TO MYSQL SERVER
app.post('/post', function (req, res) {
    var postData = req.body;
    console.log(postData);
    connection.query(
        'INSERT INTO games SET ?',
        postData,
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        },
    );
});

// DELETE MYSQL TABLE CONTENT
app.delete('/delete', function (req, res) {
    connection.query('DELETE FROM games', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});
