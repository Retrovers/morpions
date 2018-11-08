$( document ).ready(function() {

	var host = false;
	var peer = new Peer({host: 'localhost', port: 9000, path: '/morpion'})
	var conn

	function getQueryParams(qs) {
        qs = qs.split("+").join(" ");
        var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }

	function join (key){
		peer = new Peer({host: 'localhost', port: 9000, path: '/morpion'})
		conn = peer.connect(key)
	}

	var $_GET = getQueryParams(document.location.search)

	if ($_GET['joinkey'] == undefined){
		host = true
	} else {
		join($_GET['joinkey'])
	}

		peer.on('connection', function(conn) { 
			conn.on('data', function(data) {
				if (data['playername'] != undefined){
					startGame($_GET['playerName'], data['playername'])
					conn.send("{'action' : 'startgame', 'playername' : '"+ $_GET['playerName'] +"'}")
				}
				console.log(data)
			})
			
		})
		peer.on('open', function(id) {
			if (host) {
			WriteMessage("Join key is : <b>" + id + "</b><br>Send it to your friend<br>Wainting player...")
			} else {
				
			}
		})
		conn.on('open', function(){
			conn.send({'playername' : $_GET['playername']})
			conn.on('data', function(data){
				if (data['action'] == "startgame"){
					console.log('start')
				}
				console.log(data)
			})
		})

})
