var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var app = express();


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "burgers_db"
    });
}
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected to mysql as: id " + connection.threadId);
});


// Use Handlebars to render the main index.html page with the todos in it.
app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        //this res.render is responsible for making the data display in the html page
        res.render("index", { burgers: data });

        console.log("burger at index 0: " + data[0].burger_name)
    });
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        // Handlebars requires an object to be sent to the index.handlebars file.
        var eatenBurger = [];
        for (i = 0; i < burgers.length; i++) {
            if (burgers[i].devoured) {
                (eatenBurger).push(burgers[i])
            }
        }
        console.log("eatenBurg: " + eatenBurger)

        res.render("index", { burgers: eatenBurger });

    });
})
// Update a burger
app.put('/burgers/:id', function (req, res) {
    console.log("HEYHEYHEYHEYHEY")
    connection.query("UPDATE burgers SET ? WHERE id=?", [{ devoured: true }, req.params.id], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })
})
// Create a new burger
app.post('/burgers', function (req, res) {
    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        res.json({ id: result.insertId })
        // console.log({ id: result.insertId })
        // console.log(req.body.plan)

    })
})

// Delete 
app.delete('/burgers/:id', function (req, res) {
    connection.query("DELETE FROM burgers WHERE id =?", [req.params.id], function (err, result) {
        console.log("deleted burger with id of: " + req.params.id)
        if (err) {
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })
})













app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
