var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + './../client/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var appRouter = function(app) {
    app.get("/customers", function(req, res) {
        var data = {
            items: [
                {id: 1, name: 'Alexey', city: 'Moscow', email: 'alexey@gmail.com'},
                {id: 2, name: 'Andrey', city: 'Bangkok', email: 'andrey@gmail.com'},
                {id: 3, name: 'Anatoly', city: 'Singapore', email: 'anatoly@gmail.com'}
            ]
        };
        return res.send(data);
    });
};
var routes = appRouter(app);

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});