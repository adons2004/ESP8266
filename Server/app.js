const express = require("express");
const bodyParser = require("body-parser");

const app = express();
global.telemetry = "";
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get("/telemetry.html", function (request, response) {
     response.sendFile(__dirname + "/telemetry.html");
});

app.get("/get_telemetry", function (request, response) {
     response.send(global.telemetry);
});

app.get("/index.html", function (request, response) {
     response.sendFile(__dirname + "/index.html");
});

app.post("/index", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send("Successful");
});

app.post("/data.json", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body.telemetry);
    global.telemetry=request.body.telemetry;
    response.send("Successful");
});


app.listen(3000, "192.168.1.177", function(){
    console.log("Server started at 192.168.1.177:3000");
});
