function host (){

	var peer = new Peer('1', {host: '149.91.88.4', port: 9000, path: '/myapp'}); 
	console.log(peer)
}

host()