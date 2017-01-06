var express = require('express');
var app = express();

app.get('/api/share/:id', function(req, res) {
    res.sendStatus(500); // TODO Implement sharing API
});
app.post('/api/share', function(req, res) {
    res.sendStatus(500); // TODO Implement sharing API
});
app.get('/api/forks/:id', function(req, res) {
    // If each profile stores it's previous version in an indexed column, we should be able to return a list of profiles that have their previous version set to the given id
    res.sendStatus(500); // TODO Implement sharing API
});

app.use('/assets', express.static('www/assets'));
app.use('/views', express.static('www/views'));

app.get("/:id", function(req, res) {
    res.sendFile(process.cwd() + "/www/index.html");
});

app.listen(8080, 'localhost');