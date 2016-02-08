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
    var message = data.message;
    var recipient = data.recipient || "Everyone";
    var senderId = spark.id;
    console.log('received message from' + spark.id + 'for "' + recipient + '" :' + data.message);
    if (data.recipient) {
        var recipientSpark = primus.spark(data.recipient);
        if (recipientSpark) {
            recipientSpark.write({sender: senderId, message: message});
        } else {
            spark.write({sender: '[server]', message: 'message to '+ recipient +'undeliverable.'} );
        }
    } else {
        console.log ('sending to everyone');
        sendToEveryoneElse(senderId, message);
    }

    spark.write({sender: '[to ' + recipient + '] ', message: data.message});
}


function sendToEveryoneElse(senderId, message) {
    primus.forEach(function(spark, id, connections) {
        if (spark.id == senderId) return;
        var data = {sender: senderId, message: message};
        console.log(data);
        spark.write(data);
    });
}


server.listen(port);
