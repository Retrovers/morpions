$( document ).ready(function() {
	$('#playLocal').click(function(e){
		var player1LocalName = $('#player1Local').val()
		var player2LocalName = $('#player2Local').val()
		
		if (player1LocalName == "" && player1LocalName == ""){
			alert('Please, fill all input')
			e.preventDefault()
		} else {
			$("body").toggle("slide")
		}	
	})

	$('#isHost').change(function(e){
		if ($(this).is(':checked')){
			$("#JoinCodeDiv").css('display', 'none')
			$('#PlayOnlineButton').html("Host and play !")
		} else {
			$("#JoinCodeDiv").css('display', 'block')
			$('#PlayOnlineButton').html("Join and play !")
		}
	})


})