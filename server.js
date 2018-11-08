var PeerServer = require('peer').PeerServer;

var server = PeerServer({port: 9000, path: '/morpion', debug:true});
server.on('connection', function(id) { 
    console.log('new connection : ' + id)
 });