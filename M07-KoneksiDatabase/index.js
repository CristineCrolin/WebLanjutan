const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = GetDatabase();
const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS passenger (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age TEXT NOT NULL)");
    db.close();
});

function GetDatabase() {
    return new sqlite3.Database('./passenger.db', (err) => {
        if(err) {
            return console.error(err.message);
        };
        console.log("Connected to SQlite database.");
    });
}

app.post("/create", (req, res) => {
    console.log("create");
    const newPassenger = {
        name: req.body.name,
        age: req.body.age,
    };

    if (!newPassenger.name || !newPassenger.age) {
        return res.status(400).json({ msg: 'Please include name and age' });
    }

    var db = GetDatabase();
    var query = "INSERT INTO passenger (name, age) VALUES (?, ?)";
    var params = [newPassenger.name, newPassenger.age];

    db.run(query, params, (err) => {
        if(err) {
            return console.error(err.message);
        };

        res.status(200).send({
            'status':true,
            'data': {
                'name':newPassenger.name,
                'age':newPassenger.age,
            }
        });
    });
    
    db.close();
});

app.get("/list", (req, res) => {
    res.setHeader("Content-Type", "application/json");

    var db = GetDatabase();
    var query = "SELECT * FROM passenger";

    db.all(query, [], (err, rows) => {
        if(err) {
            return console.error(err.message);
        }

        var list = [];
        rows.forEach((row) => {
            list.push(
                {
                    'id':row.id,
                    'name':row.name,
                    'age':row.age
                }
            )
        })

        res.send({
            'status':true,
            'data':list
        })
    })

    db.close();
});

app.listen(4000, function() {
    console.log("Server run");
});