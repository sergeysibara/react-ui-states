var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + './../client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * return true if value is not: null, undefined, NaN, empty string ("")
 **/
function isExist(value) {
    if (value === true || value === false) {
        return true;
    }

    if (value === 0) {
        return true;
    }

    if (value) {
        return true;
    }

    return false;
}

function isExistAny(values) {
    for (var i=0; i<values.length; i++){
        if (isExist(values[i])){
            return true;
        }
    }

    return false;
}

var customersData = {
    items: [
        {id: 1, name: 'Alexey', city: 'Moscow', email: 'alexey@gmail.com'},
        {id: 2, name: 'Andrey', city: 'Bangkok', email: 'andrey@gmail.com'},
        {id: 3, name: 'Anatoly', city: 'Singapore', email: 'anatoly@gmail.com'}
    ]
};

var appRouter = function(app) {
    app.get("/customers", function(req, res) {
        return res.send(customersData);
    });

    app.get("/customer", function(req, res) {
        return res.send(customersData.items[0]);
    });

    app.post("/customer", function(req, res) {
        var validationData={};
        if (!isExist(req.body.name)){
            validationData.name = 'This field may not be blank';
        }
        if (!isExist(req.body.city)){
            validationData.city = 'This field may not be blank';
        }
        if (!isExist(req.body.email)){
            validationData.email = 'This field may not be blank';
        }

        if (isExistAny([validationData.name, validationData.city, validationData.email])){
            return res.send(validationData, 400);
        }

        customersData.items[0].name = req.body.name;
        customersData.items[0].city = req.body.city;
        customersData.items[0].email = req.body.email;
        return res.send(customersData.items[0]);
    });

    //update city only
    app.post("/customer-city", function(req, res) {
        if (!isExist(req.body.city)){
            return res.send({city:'This field may not be blank'}, 400);
        }

        customersData.items[0].city = req.body.city;
        return res.send(customersData.items[0].city);
    });
};
var routes = appRouter(app);

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});