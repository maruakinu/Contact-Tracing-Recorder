require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT;

const basicRoutes = require('./API/route/basic')
const adminRoutes = require('./API/route/admin')

const app = express();

app.use(cors());
app.use(express.json());      

//setting view engine
app.set('view engine', 'ejs');

//setting public directory
app.use(express.static(__dirname + '/public'));

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
    if(err) {
        console.log('Unable to connect to MYSQL Database');
        process.exit(1);
    }
});

app.post('/api/tracing', async function (req, res) {
    
    try{

        const name = req.body.name;
        const age = req.body.age;
        const address = req.body.address;
        const contactnum = req.body.contactnum;
        const date = req.body.date;
        const time = req.body.time;

        const sql = 'INSERT INTO tbl_usersinfo (name, age, address, contactnum, date, time) VALUES ? ';
        const values = [
            [name, age, address, contactnum, date, time]
        ];

        con.query(sql, [values], function(err, result) {

            if(err) res.status(500).json({
                message: process.env.GENERIC_ERROR_MESSAGE
            });

            console.log('Successfully created record');

            res.status(201).json({
                message: 'Successfully created record'
            });

        })

    } catch(error) {
        res.status(500).json({
            message: process.env.GENERIC_ERROR_MESSAGE
        });
    }
    
});

app.get('/api/tracing/', async function (req, res) {

    try {
        const search = '%' + req.query.searchkeyword + '%';

        const sql = 'SELECT * FROM tbl_usersinfo WHERE name like ? or time like ?';
        const values = [search, search];

        con.query(sql, values, function(err, result) {
            if(err) res.status(500).json({
                message: process.env.GENERIC_ERROR_MESSAGE
            });

            res.status(200).json({
                message: 'Successfully retrieved records',
                tracing: result
            });

        });

    } catch(err) {
        res.status(500).json({
            message: process.env.GENERIC_ERROR_MESSAGE
        });
    }

});

app.get('/api/tracing/:id', async function (req, res){

    try{

        const id = req.params.id;

        const sql = 'SELECT * FROM tbl_usersinfo WHERE id = ?';
        const values = [id];

        con.query(sql, values, function(err, result) {
            if(err) res.status(500).json({
                message: process.env.GENERIC_ERROR_MESSAGE
            });

            res.status(200).json({
                message: 'Successfully retrieved records for id ' + id,
                tracing: {
                    id: result[0].id,
                    name: result[0].name,
                    age: result[0].age,
                    address: result[0].address,
                    contactnum: result[0].contactnum,
                    date: result[0].date,
                    time: result[0].time,
                }
            });
        });

    } catch(err) {
        res.status(500).json({
            message: process.env.GENERIC_ERROR_MESSAGE
        });
    }

});

app.put('/api/tracing/:id', async function(req, res) {

    try{

        const id = req.params.id;

        const name = req.body.name;
        const age = req.body.age;
        const address = req.body.address;
        const contactnum = req.body.contactnum;
        const date = req.body.date;
        const time = req.body.time;

        const sql = 'UPDATE tbl_usersinfo SET name = ?, age = ?, address = ?, contactnum = ?, date = ?, time = ? WHERE id = ?';
        const values = [name, age, address, contactnum, date, time, id];

        con.query(sql, values, function(err, result) {

            if(err) res.status(500).json({
                message: process.env.GENERIC_ERROR_MESSAGE
            });

            console.log('Successfully updated record');

            res.status(201).json({
                message: 'Successfully updated record'
            });

        });


    } catch (error) {
        res.status(500).json({
            message: process.env.GENERIC_ERROR_MESSAGE
        });
    }

});

app.delete('/api/tracing/:id', async function(req, res) {
    try{

        const id = req.params.id;
        const sql = 'DELETE FROM tbl_usersinfo WHERE id = ?';
        const values = [id];

        con.query(sql, values, function (err, result) {

            if(err) res.status(500).json({
                message: process.env.GENERIC_ERROR_MESSAGE
            });

            console.log('Successfully deleted record');

            res.status(201).json({
                message: 'Successfully deleted record'
            });

        });
        
    } catch(error) {
        res.status(500).json({
            message: process.env.GENERIC_ERROR_MESSAGE
        });
    }
});
//routing all request
app.use('/',basicRoutes)
app.use('/admin',adminRoutes)

app.listen(PORT, function() {
    console.log('Listening at port ' + PORT);
});