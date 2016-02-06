'use strict';

//
// Create the HTTP server and attach Primus
//
var port = 3000,
    express = require('express'),
    Primus = require('primus'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    primus = new Primus(server);

//
// Serve static assets
//
app.use(express.static('public'));


//
// Listen for connections and echo the events send.
//

primus.on('connection', function connection(spark) {
    spark.on('data', function (data) {
        onSparkDataRecieved(spark, data);
    });
    var connectedIds = [];
    primus.forEach(function(connectedSpark, id, connections) {
        if (id !== spark.id){connectedIds.push(id);}
    });
    spark.write(connectedIds + ' are already connected.');
    sendToEveryoneElse(spark.id, 'new connection: ' + spark.id);
});

function onSparkDataRecieved(spark, data) {
    console.log('received message for ' + data.recipient + ':' + data.message);
    var message = '[from ' + spark.id + '] -->' + data.message;
    var recipient = data.recipient || "Everyone";
    var senderId = spark.id;
    if (data.recipient) {
        var recipientSpark = primus.spark(data.recipient);
        if (recipientSpark) {
            recipientSpark.write(message);
        } else {
            spark.write('[undeliverable]');
        }
    } else {
        sendToEveryoneElse(senderId, message);
    }

    spark.write('[to ' + recipient + '] -->' + data.message);
}


function sendToEveryoneElse(senderId, message) {
    primus.forEach(function(spark, id, connections) {
        if (spark.id == senderId) return;
        spark.write(message);
    });
}


server.listen(port);
